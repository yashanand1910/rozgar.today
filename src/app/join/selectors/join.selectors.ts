import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromJoin from '../reducers';
import * as CoreSelectors from '@core/selectors/core.selector';
import { additionalKey } from '@core/reducers';

export const selectJoinState = createFeatureSelector<fromJoin.State, fromJoin.JoinState>(fromJoin.joinFeatureKey);

export const selectJoinAdditionalState = createSelector(selectJoinState, (state) => state[additionalKey]);

export const selectJoinSteps = createSelector(selectJoinAdditionalState, (state) => state.steps);

export const selectJoinCurrentStepNumber = createSelector(
  selectJoinAdditionalState,
  CoreSelectors.selectCurrentRoute,
  (state, route) => state.steps.map((step) => step.path).indexOf(route?.routeConfig?.path)
);

export const selectJoinNextStepPath = createSelector(
  selectJoinAdditionalState,
  selectJoinCurrentStepNumber,
  (state, number) => state.steps[number + 1]?.path
);

export const selectJoinPreviousStepPath = createSelector(
  selectJoinAdditionalState,
  selectJoinCurrentStepNumber,
  (state, number) => state.steps[number - 1]?.path
);

export const selectJoinIsLoading = createSelector(selectJoinAdditionalState, (state) => state.isLoading);

export const selectJoinIsProcessing = createSelector(selectJoinAdditionalState, (state) => state.isProcessing);

export const selectSelectedPlanId = createSelector(selectJoinAdditionalState, (state) => state.selectedPlanId);
