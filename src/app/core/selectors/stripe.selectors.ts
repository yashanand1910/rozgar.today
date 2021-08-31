import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStripe from '../reducers/stripe.reducer';
import { PaymentIntentState } from '../reducers/stripe.reducer';
import { PaymentIntentContext } from '@core/models';

export const selectState = createFeatureSelector<fromStripe.State>(fromStripe.featureKey);

export const selectPaymentIntentState = createSelector(
  selectState,
  (state: fromStripe.State, props: { context: PaymentIntentContext }) => state.paymentIntentState[props.context]
);

export const selectPaymentIntentIsLoading = createSelector(
  (state: PaymentIntentState, props: { context: PaymentIntentContext }) => selectPaymentIntentState(state, props),
  (state: PaymentIntentState) => (state && 'isLoading' in state ? state.isLoading : true)
);

export const selectPaymentIntentProducts = createSelector(
  (state: PaymentIntentState, props: { context: PaymentIntentContext }) => selectPaymentIntentState(state, props),
  (state: PaymentIntentState) => state.products
);

export const selectFirestoreState = createSelector(selectState, (state) => {
  const firestoreState = {
    customerId: state.customerId ? state.customerId : null,
    paymentIntentState: {}
  };
  for (const context in state.paymentIntentState) {
    if (state.paymentIntentState[context]) {
      firestoreState.paymentIntentState[context] = {
        id: state.paymentIntentState[context].id ? state.paymentIntentState[context].id : null,
        products: state.paymentIntentState[context].products ? state.paymentIntentState[context].products : null
      };
    }
  }
  return firestoreState;
});
