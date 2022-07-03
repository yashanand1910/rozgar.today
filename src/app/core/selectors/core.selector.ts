import { createFeatureSelector, createSelector } from '@ngrx/store';
import { additionalKey, AdditionalState } from '../reducers/core.reducer';
import { featureKey as stripeFeatureKey } from '../reducers/stripe.reducer';
import { featureKey as joinFeatureKey } from '@app/join/reducers';
import * as StripeSelectors from './stripe.selectors';
import { JoinSelectors } from '@app/join/selectors';

export const selectAdditionalState = createFeatureSelector<AdditionalState>(additionalKey);

export const selectError = createSelector(selectAdditionalState, (state) => state.error);

export const selectIsProcessing = createSelector(selectAdditionalState, (state) => state.isProcessing);

export const selectIsLoading = createSelector(selectAdditionalState, (state) => state.isLoading);

export const selectFirestoreState = createSelector(
  StripeSelectors.selectFirestoreState,
  JoinSelectors.selectFirestoreState,
  (stripeFirestoreState, joinFirestoreState) => ({
    [stripeFeatureKey]: stripeFirestoreState,
    [joinFeatureKey]: joinFirestoreState
  })
);

export const selectIsUpdated = createSelector(selectAdditionalState, (state) => state.isUpdated);

export const selectConfig = createSelector(selectAdditionalState, (state) => state.config);

export const selectAlerts = createSelector(selectConfig, (state) => (state.alerts));

export const selectAlert = (component: string) =>
  createSelector(selectAlerts, (state) => (state ? state[component] : null));

export const selectConstraints = createSelector(selectConfig, (state) => state.constraints);

export const selectConstraint = (name: string) =>
  createSelector(selectConstraints, (state) => (state ? state[name] : null));
