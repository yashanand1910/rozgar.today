import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CoreActions from '../actions';
import * as StripeSelectors from '../selectors/stripe.selectors';
import * as AuthSelectors from '@auth/selectors';
import { catchError, first, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Collection, CreatePaymentIntentInput, PaymentIntent, Function } from '../models';
import firebase from 'firebase';
import FirebaseError = firebase.FirebaseError;
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { StoreUser } from '@auth/models';

@Injectable()
export class StripeEffects {
  /**
   * Creates Payment Intent on Stripe using on call function in Firebase
   * and stores the clientSecret in state. Does not create new if clientSecret already found for a particular product.
   *
   * @type {Observable<{clientSecret: string} & TypedAction<"[Stripe] Create Payment Intent Success">> & CreateEffectMetadata}
   */
  createPaymentIntent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoreActions.createPaymentIntent),
      mergeMap((action) => {
        return of(action).pipe(
          withLatestFrom(
            this.store.select(StripeSelectors.selectProductPaymentClientSecret, { productPath: action.productPath })
          )
        );
      }),
      switchMap(([action, clientSecret]) => {
        if (clientSecret) {
          return of(CoreActions.createPaymentIntentSuccess({ productPath: action.productPath, clientSecret }));
        } else {
          return this.store.select(AuthSelectors.selectUserUid).pipe(
            first(),
            switchMap((uid) => this.afs.collection<StoreUser>(Collection.Users).doc(uid).get()),
            map((snapshot) => snapshot.data().metadata.stripeId),
            switchMap((stripeId) =>
              this.functions.httpsCallable<CreatePaymentIntentInput, PaymentIntent>(
                Function.CreatePaymentIntent
              )({
                productPath: action.productPath,
                stripeCustomerId: stripeId
              })
            ),
            map((output) =>
              CoreActions.createPaymentIntentSuccess({
                productPath: action.productPath,
                clientSecret: output.clientSecret
              })
            ),
            catchError((error: FirebaseError) =>
              of(CoreActions.createPaymentIntentFailiure({ productPath: action.productPath, error: error.code }))
            )
          );
        }
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
