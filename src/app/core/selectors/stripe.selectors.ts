import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStripe from '../reducers/stripe.reducer';
import { CreatePaymentIntentInput } from '@core/models';
import { ProductPaymentIntent } from '../reducers/stripe.reducer';

export const selectState = createFeatureSelector<fromStripe.State>(fromStripe.featureKey);

export const selectProductPaymentIntent = createSelector(
  selectState,
  (state: fromStripe.State, props: CreatePaymentIntentInput) => state[props.productPath]
);

export const selectProductPaymentClientSecret = createSelector(
  (state: ProductPaymentIntent, props: CreatePaymentIntentInput) => selectProductPaymentIntent(state, props),
  (state) => state?.clientSecret
);

export const selectFirestoreState = createSelector(selectState, (state) => {
  const firestoreState = {};
  for (const productPath in state) {
    if (state[productPath].id) {
      firestoreState[productPath] = { id: state[productPath].id };
    }
  }
  return firestoreState;
});
