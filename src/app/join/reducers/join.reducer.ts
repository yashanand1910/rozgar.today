import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as fromCore from '@core/reducers';
import * as fromPlan from './plan.reducer';
import { Step } from '@app/join/models';

export const joinFeatureKey = 'join';
export const additionalKey = 'additional';

export interface AdditionalState {
  steps: Step[];
  isLoading: boolean;
}

export interface JoinState {
  [fromPlan.plansFeatureKey]: fromPlan.State;
  [additionalKey]: AdditionalState;
}

export interface State extends fromCore.State {
  [joinFeatureKey]: JoinState;
}

const initialAdditionalState: AdditionalState = {
  steps: [
    {
      title: 'Plan',
      path: 'plan',
      icon: 'file-protect'
    },
    {
      title: 'Account',
      path: 'account',
      icon: 'form'
    },
    {
      title: 'Payment',
      path: 'payment',
      icon: 'credit-card'
    },
    {
      title: 'Ready!',
      path: '',
      icon: 'check-square'
    }
  ],
  isLoading: false
};

const additionalReducer = createReducer(initialAdditionalState);

export const reducers: ActionReducerMap<JoinState> = {
  [fromPlan.plansFeatureKey]: fromPlan.reducer,
  [additionalKey]: additionalReducer
};
