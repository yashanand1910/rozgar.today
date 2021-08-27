import { createFeatureSelector, createSelector } from '@ngrx/store';
import { additionalKey, AdditionalState } from '@core/reducers/core.reducer';
import * as AlertSelectors from './alert.selectors';
import { featureKey as stripeFeatureKey } from '../reducers/stripe.reducer';
import { featureKey as joinFeatureKey } from '@app/join/reducers';
import * as StripeSelectors from './stripe.selectors';
import * as ConstraintSelectors from './constraint.selectors';
import { JoinSelectors } from '@app/join/selectors';

export const selectAdditionalState = createFeatureSelector<AdditionalState>(additionalKey);

export const selectError = createSelector(selectAdditionalState, (state) => state.error);

export const selectIsLoading = createSelector(
  AlertSelectors.selectIsLoading,
  ConstraintSelectors.selectIsLoading,
  (alerts, constraints) => alerts || constraints
);

export const selectIsProcessing = createSelector(selectAdditionalState, (state) => state.isProcessing);

export const selectFirestoreState = createSelector(
  StripeSelectors.selectFirestoreState,
  JoinSelectors.selectFirestoreState,
  (stripeFirestoreState, joinFirestoreState) => ({
    [stripeFeatureKey]: stripeFirestoreState,
    [joinFeatureKey]: joinFirestoreState
  })
);

export const selectIsUpdated = createSelector(selectAdditionalState, (state) => state.isUpdated);
