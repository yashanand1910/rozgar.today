import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromJoin from '../reducers';
import { additionalKey } from '@core/reducers';
import * as RouterSelectors from '@core/selectors/router.selectors';

export const selectState = createFeatureSelector<fromJoin.State, fromJoin.JoinState>(fromJoin.featureKey);

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
