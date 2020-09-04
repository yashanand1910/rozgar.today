import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as fromRoot from '@core/reducers';
import * as fromPlan from './plan.reducer';
import { Step } from '@app/join/models';
import { setCurrentStepFromPath } from '@app/join/actions';

export const joinFeatureKey = 'join';
export const additionalKey = 'additional';

export interface AdditionalState {
  steps: Step[];
  currentStepNumber: number;
  isLoading: boolean;
}

export interface JoinState {
  [fromPlan.plansFeatureKey]: fromPlan.State;
  [additionalKey]: AdditionalState;
}

export interface State extends fromRoot.State {
  [joinFeatureKey]: JoinState;
}

const initialAdditionalState: AdditionalState = {
  steps: [
    {
      title: 'Plan',
      path: 'plan',
      icon: 'file-protect',
    },
    {
      title: 'Account',
      path: 'account',
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
  currentStepNumber: 0,
  isLoading: false,
};

const additionalReducer = createReducer(
  initialAdditionalState,
  on(setCurrentStepFromPath, (state, action) => {
    return {
      ...state,
      currentStepNumber: state.steps.findIndex((step) => step.path === action.path),
    };
  })
);

export const reducers: ActionReducerMap<JoinState> = {
  [fromPlan.plansFeatureKey]: fromPlan.reducer,
  [additionalKey]: additionalReducer,
};
