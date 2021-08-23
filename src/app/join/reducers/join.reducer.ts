import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as fromCore from '@core/reducers';
import * as JoinActions from '../actions';
import * as CoreActions from '@core/actions';
import { Step, StepPath } from '@app/join/models';
import { extract } from '@i18n/services';

export const featureKey = 'join';

export interface AdditionalState {
  steps: Step[];
  selectedPlanId: string;
  error: string;
}

export interface JoinState {
  [fromCore.additionalKey]: AdditionalState;
}

export interface State extends fromCore.State {
  [featureKey]: JoinState;
}

const initialAdditionalState: AdditionalState = {
  steps: [
    {
      title: extract('Plan'),
      status: 'wait',
      path: StepPath.Plan,
      icon: 'file-protect',
      disabled: true
    },
    {
      title: extract('Account'),
      status: 'wait',
      path: StepPath.Account,
      icon: 'form',
      disabled: true
    },
    {
      title: extract('Payment'),
      status: 'wait',
      path: StepPath.Payment,
      icon: 'credit-card',
      disabled: true
    },
    {
      title: extract('Resume'),
      status: 'wait',
      path: StepPath.Resume,
      icon: 'check-square',
      disabled: true
    }
  ],
  selectedPlanId: null,
  error: null
};

const additionalReducer = createReducer(
  initialAdditionalState,
  on(JoinActions.selectPlan, (state, action) => ({ ...state, selectedPlanId: action.id })),
  on(JoinActions.setStepInfo, (state, action) => {
    let newSteps = state.steps.map((step) => ({ ...step }));
    let newStep = newSteps.find((step) => step.path == action.path);
    if (action.description) {
      newStep.description = action.description;
    }
    if (action.status) {
      newStep.status = action.status;
    }
    if ('disabled' in action) {
      newStep.disabled = action.disabled;
    }
    return { ...state, steps: newSteps };
  }),
  on(CoreActions.getFirestoreStateSuccess, (state, action) => {
    return action.state
      ? {
          ...state,
          ...action.state[fromCore.additionalKey]
        }
      : {
          ...state
        };
  }),
  on(JoinActions.resetState, () => initialAdditionalState)
);

export const reducers: ActionReducerMap<JoinState> = {
  [fromCore.additionalKey]: additionalReducer
};
