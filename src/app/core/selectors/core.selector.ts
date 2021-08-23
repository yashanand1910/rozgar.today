import { createFeatureSelector, createSelector } from '@ngrx/store';
import { additionalKey, AdditionalState, State } from '@core/reducers/core.reducer';
import * as ConstraintSelectors from './constraint.selectors';
import * as AlertSelectors from './alert.selectors';
import { featureKey as stripeFeatureKey } from '../reducers/stripe.reducer';
import { featureKey as joinFeatureKey } from '@app/join/reducers';
import { selectFirestoreState as selectStripeFirestoreState } from '../selectors/stripe.selectors';
import { selectFirestoreState as selectJoinFirestoreState } from '@app/join/selectors';

export const selectAdditionalState = createFeatureSelector<AdditionalState>(additionalKey);

export const selectError = createSelector(selectAdditionalState, (state) => state.error);

export const selectIsLoading = createSelector(
  AlertSelectors.selectIsLoading,
  ConstraintSelectors.selectIsLoading,
  selectAdditionalState,
  (alerts, constraints, state) => alerts || constraints || state.isLoading
);

export const selectIsLoaded = createSelector(selectAdditionalState, (state) => state.isLoaded);

export const selectIsProcessing = createSelector(selectAdditionalState, (state) => state.isProcessing);

export const selectFirestoreState = (state: State) => ({
  [stripeFeatureKey]: selectStripeFirestoreState(state[stripeFeatureKey]),
  [joinFeatureKey]: selectJoinFirestoreState(state[joinFeatureKey])
});
