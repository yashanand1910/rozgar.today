import { createSelector } from '@ngrx/store';
import * as fromJoin from '../reducers';
import { additionalKey, State } from '@core/reducers';
import * as RouterSelectors from '@core/selectors/router.selectors';

// Not using createFeatureSelector since this module is lazy-loading
export const selectState = createSelector(
  (state: State) => state[fromJoin.featureKey],
  (value) => value as fromJoin.JoinState
);

export const selectAdditionalState = createSelector(selectState, (state) => state[additionalKey]);

export const selectSteps = createSelector(selectAdditionalState, (state) => state.steps);

export const selectCurrentStepNumber = createSelector(
  selectAdditionalState,
  RouterSelectors.selectCurrentRoute,
  (state, route) => state.steps.map((step) => step.path).indexOf(route?.routeConfig?.path)
);

export const selectNextStepPath = createSelector(
  selectAdditionalState,
  selectCurrentStepNumber,
  (state, number) => state.steps[number + 1]?.path
);

export const selectPreviousStepPath = createSelector(
  selectAdditionalState,
  selectCurrentStepNumber,
  (state, number) => state.steps[number - 1]?.path
);

export const selectSelectedPlanId = createSelector(selectAdditionalState, (state) => state.selectedPlanId);

export const selectFirestoreState = createSelector(selectState, (state) => ({
  [additionalKey]: { selectedPlanId: state ? state[additionalKey].selectedPlanId : null }
}));
