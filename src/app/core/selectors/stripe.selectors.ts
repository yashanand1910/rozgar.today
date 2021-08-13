import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStripe from '../reducers/stripe.reducer';
import { CreatePaymentIntentInput } from '@core/models';
import { ProductPaymentState } from '../reducers/stripe.reducer';

export const selectStripeState = createFeatureSelector<fromStripe.State>(fromStripe.stripeFeatureKey);

export const selectStripeProductPaymentState = createSelector(
  selectStripeState,
  (state: fromStripe.State, props: CreatePaymentIntentInput) => state[props.productPath]
);

export const selectStripeProductPaymentClientSecret = createSelector(
  (state: ProductPaymentState, props: CreatePaymentIntentInput) => selectStripeProductPaymentState(state, props),
  (state) => state?.clientSecret
);
