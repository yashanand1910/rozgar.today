import { ActionReducerMap, createFeatureSelector, createReducer, createSelector, MetaReducer, on } from '@ngrx/store';
import { environment } from '@env/environment';
import * as fromRoot from '@core/reducers';
import * as fromPlan from './plan.reducer';
import { Step } from '@app/join/models';
import { setCurrentStepFromPath } from '@app/join/actions';

export const joinFeatureKey = 'join';

export interface JoinState {
  [fromPlan.plansFeatureKey]: fromPlan.State;
  steps: {
    list: Step[];
    currentNumber: number;
    isLoading: boolean;
  };
}

export interface State extends fromRoot.State {
  [joinFeatureKey]: JoinState;
}

const initialStepsState = {
  list: [
    {
      title: 'Plan',
      path: 'plan',
      icon: 'file-protect',
    },
    {
      title: 'Profile',
      path: 'profile',
      icon: 'form',
    },
    {
      title: 'Payment',
      path: 'payment',
      icon: 'credit-card',
    },
    {
      title: 'Ready!',
      path: '',
      icon: 'check-square',
    },
  ],
  currentNumber: 0,
  isLoading: false,
};

const stepsReducer = createReducer(
  initialStepsState,
  on(setCurrentStepFromPath, (state, action) => {
    return {
      ...state,
      currentNumber: state.list.findIndex((step) => step.path === action.path),
    };
  })
);

export const reducers: ActionReducerMap<JoinState> = {
  [fromPlan.plansFeatureKey]: fromPlan.reducer,
  steps: stepsReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectJoinState = createFeatureSelector<State, JoinState>(joinFeatureKey);

export const selectSteps = createSelector(selectJoinState, (state) => state.steps.list);

export const selectStepsCurrentNumber = createSelector(selectJoinState, (state) => state.steps.currentNumber);

export const selectCurrentStep = createSelector(
  selectJoinState,
  (state) => state.steps.list[state.steps.currentNumber]
);

export const selectNextStepPath = createSelector(
  selectJoinState,
  (state) => state.steps.list[state.steps.currentNumber + 1].path
);

export const selectStepsIsLoading = createSelector(selectJoinState, (state) => state.steps.isLoading);

export const selectPlanState = createSelector(selectJoinState, (state) => state[fromPlan.plansFeatureKey]);

export const { selectAll: selectAllPlans } = fromPlan.adapter.getSelectors(selectPlanState);

export const selectCurrentPlanId = createSelector(selectPlanState, fromPlan.getCurrentPlanId);

export const selectPlansIsLoading = createSelector(selectPlanState, fromPlan.getIsLoading);
