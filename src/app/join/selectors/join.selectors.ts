import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromJoin from '../reducers';
import * as fromAuth from '../reducers';

export const selectJoinState = createFeatureSelector<fromJoin.State, fromJoin.JoinState>(fromJoin.joinFeatureKey);

export const selectSteps = createSelector(selectJoinState, (state) => state[fromAuth.additionalKey].steps);

export const selectStepsCurrentNumber = createSelector(
  selectJoinState,
  (state) => state[fromAuth.additionalKey].currentStepNumber
);

export const selectCurrentStep = createSelector(
  selectJoinState,
  (state) => state[fromAuth.additionalKey].steps[state[fromAuth.additionalKey].currentStepNumber]
);

export const selectNextStepPath = createSelector(
  selectJoinState,
  (state) => state[fromAuth.additionalKey].steps[state[fromAuth.additionalKey].currentStepNumber + 1].path
);

export const selectPreviousStepPath = createSelector(
  selectJoinState,
  (state) => state[fromAuth.additionalKey].steps[state[fromAuth.additionalKey].currentStepNumber - 1].path
);

export const selectStepsIsLoading = createSelector(selectJoinState, (state) => state[fromAuth.additionalKey].isLoading);
