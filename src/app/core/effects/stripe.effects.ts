import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StripeActions } from '../actions';
import { StripeSelectors } from '../selectors';
import { AuthSelectors } from '@auth/selectors';
import { catchError, exhaustMap, first, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Functions, httpsCallableData } from '@angular/fire/functions';
import { Cart, Collection, Function, PaymentIntent } from '../models';
import firebase from 'firebase/compat/app';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { collection, doc, docData, Firestore } from '@angular/fire/firestore';
import { StoreUser } from '@auth/models';
import { Logger } from '@core/services';
import { getSerializableFirebaseError } from '@shared/helper';
import FirebaseError = firebase.FirebaseError;

const log = new Logger('StripeEffects');

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class StripeEffects {
  /**
   * Creates Payment Intent on Stripe using on call function in Firebase
   * and stores the clientSecret in state. Does not create new if clientSecret already found for a particular product.
   */
  createPaymentIntent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StripeActions.createPaymentIntent),
      exhaustMap((action) => {
        return of(action).pipe(withLatestFrom(this.store.select(StripeSelectors.selectState)));
      }),
      switchMap(([action, state]) => {
        const clientSecret = state.paymentIntentState[action.context]?.clientSecret;
        let customerId = state.customerId;
        if (clientSecret) {
          log.debug('Client secret found, skipping API call...');
          return of(StripeActions.createPaymentIntentSuccess({ context: action.context, clientSecret }));
        } else {
          if (customerId) {
            return httpsCallableData<Cart, PaymentIntent>(
              this.functions,
              Function.CreatePaymentIntent
            )({
              context: action.context,
              products: action.products,
              customerId
            }).pipe(
              map((paymentIntent) =>
                StripeActions.createPaymentIntentSuccess({
                  context: action.context,
                  ...paymentIntent
                })
              ),
              catchError((error: FirebaseError) =>
                of(
                  StripeActions.createPaymentIntentFailure({
                    context: action.context,
                    error: getSerializableFirebaseError(error)
                  })
                )
              )
            );
          }

          // Fetch customerId from user profile since it is not found
          return this.store.select(AuthSelectors.selectUserUid).pipe(
            first(),
            switchMap((uid) => docData<Partial<StoreUser>>(doc(collection(this.firestore, Collection.Users), uid))),
            map((user) => user.metadata.stripeId),
            switchMap((id) => {
              customerId = id;
              return httpsCallableData<Cart, PaymentIntent>(
                this.functions,
                Function.CreatePaymentIntent
              )({
                context: action.context,
                products: action.products,
                customerId
              });
            }),
            map((paymentIntent) =>
              StripeActions.createPaymentIntentSuccess({
                customerId,
                context: action.context,
                ...paymentIntent
              })
            ),
            catchError((error: FirebaseError) =>
              of(
                StripeActions.createPaymentIntentFailure({
                  context: action.context,
                  error: getSerializableFirebaseError(error)
                })
              )
            )
          );
        }
      })
    );
  });

  updatePaymentIntent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StripeActions.updatePaymentIntent),
      exhaustMap((action) => {
        return of(action).pipe(withLatestFrom(this.store.select(StripeSelectors.selectState)));
      }),
      switchMap(([action, state]) => {
        const customerId = state.customerId;

        if (customerId) {
          return httpsCallableData<Cart, PaymentIntent>(
            this.functions,
            Function.UpdatePaymentIntent
          )({
            context: action.context,
            products: action.products,
            id: state.paymentIntentState[action.context].id,
            customerId
          }).pipe(
            map((paymentIntent) =>
              StripeActions.updatePaymentIntentSuccess({
                context: action.context,
                ...paymentIntent
              })
            ),
            catchError((error: FirebaseError) =>
              of(
                StripeActions.updatePaymentIntentFailure({
                  context: action.context,
                  error: getSerializableFirebaseError(error)
                })
              )
            )
          );
        }

        // Fetch customerId from user profile since it is not found
        return this.store.select(AuthSelectors.selectUserUid).pipe(
          first(),
          switchMap((uid) => docData<Partial<StoreUser>>(doc(collection(this.firestore, Collection.Users), uid))),
          map((user) => user.metadata.stripeId),
          switchMap(() => {
            return httpsCallableData<Cart, PaymentIntent>(
              this.functions,
              Function.UpdatePaymentIntent
            )({
              context: action.context,
              products: action.products,
              id: state.paymentIntentState[action.context].id,
              customerId
            });
          }),
          map((paymentIntent) =>
            StripeActions.updatePaymentIntentSuccess({
              context: action.context,
              ...paymentIntent
            })
          ),
          catchError((error: FirebaseError) =>
            of(
              StripeActions.updatePaymentIntentFailure({
                context: action.context,
                error: getSerializableFirebaseError(error)
              })
            )
          )
        );
      })
    );
  });

  loadPaymentIntent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StripeActions.loadPaymentIntent),
      exhaustMap((action) => {
        return this.store.pipe(
          select(StripeSelectors.selectPaymentIntentState, { context: action.context }),
          first(),
          switchMap((paymentIntent) => {
            if (paymentIntent.clientSecret) {
              log.debug('Client secret found, skipping API call...');
              return of(
                StripeActions.loadPaymentIntentSuccess({
                  context: action.context,
                  ...paymentIntent
                })
              );
            } else {
              return httpsCallableData<Partial<Cart>, PaymentIntent>(
                this.functions,
                Function.LoadPaymentIntent
              )({
                id: action.id,
                context: action.context
              }).pipe(
                map((paymentIntent) =>
                  StripeActions.loadPaymentIntentSuccess({
                    context: action.context,
                    ...paymentIntent
                  })
                ),
                catchError((error: FirebaseError) =>
                  of(
                    StripeActions.loadPaymentIntentFailure({
                      context: action.context,
                      error: getSerializableFirebaseError(error)
                    })
                  )
                )
              );
            }
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private functions: Functions,
    private firestore: Firestore,
    private store: Store
  ) {}
}
