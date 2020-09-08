import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromJoin from '../reducers';
import * as fromAuth from '../reducers';

export const selectJoinState = createFeatureSelector<fromJoin.State, fromJoin.JoinState>(fromJoin.joinFeatureKey);

export const selectJoinAdditionalState = createSelector(selectJoinState, (state) => state[fromAuth.additionalKey]);

export const selectSteps = createSelector(selectJoinAdditionalState, (state) => state.steps);

export const selectStepsCurrentNumber = createSelector(selectJoinAdditionalState, (state) => state.currentStepNumber);

export const selectCurrentStep = createSelector(
  selectJoinAdditionalState,
  (state) => state.steps[state.currentStepNumber]
);

export const selectNextStepPath = createSelector(
  selectJoinAdditionalState,
  (state) => state.steps[state.currentStepNumber + 1].path
);

export const selectPreviousStepPath = createSelector(
  selectJoinAdditionalState,
  (state) => state.steps[state.currentStepNumber - 1].path
);

export const selectStepsIsLoading = createSelector(selectJoinAdditionalState, (state) => state.isLoading);
