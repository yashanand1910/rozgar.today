import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StripeActions } from '../actions';
import { StripeSelectors } from '../selectors';
import { AuthSelectors } from '@auth/selectors';
import { catchError, exhaustMap, first, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Collection, Cart, PaymentIntent, Function } from '../models';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { StoreUser } from '@auth/models';
import { Logger } from '@core/services';
import { getSerializableFirebaseError } from '@shared/helper';

const log = new Logger('StripeEffects');

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
            return this.functions
              .httpsCallable<Cart, PaymentIntent>(Function.CreatePaymentIntent)({
                context: action.context,
                products: action.products,
                customerId
              })
              .pipe(
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
            switchMap((uid) => this.afs.collection<StoreUser>(Collection.Users).doc(uid).get()),
            map((snapshot) => snapshot.data().metadata.stripeId),
            switchMap((id) => {
              customerId = id;
              return this.functions.httpsCallable<Cart, PaymentIntent>(Function.CreatePaymentIntent)({
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
          return this.functions
            .httpsCallable<Cart, PaymentIntent>(Function.UpdatePaymentIntent)({
              context: action.context,
              products: action.products,
              id: state.paymentIntentState[action.context].id,
              customerId
            })
            .pipe(
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
          switchMap((uid) => this.afs.collection<StoreUser>(Collection.Users).doc(uid).get()),
          map((snapshot) => snapshot.data().metadata.stripeId),
          switchMap(() => {
            return this.functions.httpsCallable<Cart, PaymentIntent>(Function.UpdatePaymentIntent)({
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
        return this.store.select(StripeSelectors.selectPaymentIntentState, { context: action.context }).pipe(
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
              return this.functions
                .httpsCallable<Partial<Cart>, PaymentIntent>(Function.LoadPaymentIntent)({
                  id: action.id,
                  context: action.context
                })
                .pipe(
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
    private functions: AngularFireFunctions,
    private afs: AngularFirestore,
    private store: Store
  ) {}
}
