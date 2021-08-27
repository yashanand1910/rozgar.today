import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StripeActions } from '../actions';
import { StripeSelectors } from '../selectors';
import { AuthSelectors } from '@auth/selectors';
import { catchError, first, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Collection, Cart, PaymentIntent, Function } from '../models';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { StoreUser } from '@auth/models';
import { Logger } from '@core/services';

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
      mergeMap((action) => {
        return of(action).pipe(withLatestFrom(this.store.select(StripeSelectors.selectState)));
      }),
      switchMap(([action, state]) => {
        const clientSecret = state.paymentIntentState[action.context]?.clientSecret;
        let customerId = state.customerId;
        if (clientSecret) {
          log.debug('Client secret found, skipping payment intent creation...');
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
                map((output) =>
                  StripeActions.createPaymentIntentSuccess({
                    context: action.context,
                    clientSecret: output.clientSecret,
                    id: output.id,
                    amount: output.amount,
                    currency: output.currency
                  })
                ),
                catchError((error: FirebaseError) =>
                  of(
                    StripeActions.createPaymentIntentFailiure({
                      context: action.context,
                      error: { code: error.code, name: error.name, message: error.message, stack: error.stack }
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
            map((output) =>
              StripeActions.createPaymentIntentSuccess({
                customerId,
                context: action.context,
                id: output.id,
                clientSecret: output.clientSecret,
                amount: output.amount,
                currency: output.currency
              })
            ),
            catchError((error: FirebaseError) =>
              of(
                StripeActions.createPaymentIntentFailiure({
                  context: action.context,
                  error: { code: error.code, name: error.name, message: error.message, stack: error.stack }
                })
              )
            )
          );
        }
      })
    );
  });

  updatePaymentIntent$ = createEffect(
    this.actions$.pipe(
      ofType(StripeActions.updatePaymentIntent),
      switchMap
    )
  )

  constructor(
    private actions$: Actions,
    private functions: AngularFireFunctions,
    private afs: AngularFirestore,
    private store: Store
  ) {}
}
