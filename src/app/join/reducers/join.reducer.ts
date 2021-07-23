import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as fromCore from '@core/reducers';
import * as JoinActions from '../actions';
import { Step, StepPath } from '@app/join/models';
import { extract } from '@i18n/services';

export const joinFeatureKey = 'join';

export interface AdditionalState {
  steps: Step[];
  isLoading: boolean;
  isProcessing: boolean;
  selectedPlanId: string;
  error: string;
}

export interface JoinState {
  [fromCore.additionalKey]: AdditionalState;
}

export interface State extends fromCore.State {
  [joinFeatureKey]: JoinState;
}

// For partial state stored in Firestore
export class JoinFirestoreState {
  [fromCore.additionalKey]: AdditionalFirestoreState;

  constructor(state: JoinState) {
    this[fromCore.additionalKey] = { ...new AdditionalFirestoreState(state[fromCore.additionalKey]) };
  }
}

// For partial state stored in Firestore
export class AdditionalFirestoreState {
  selectedPlanId: string;

  constructor(state: AdditionalState) {
    this.selectedPlanId = state.selectedPlanId;
  }
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
  isLoading: false,
  isProcessing: false,
  selectedPlanId: null,
  error: null
};

const additionalReducer = createReducer(
  initialAdditionalState,
  on(JoinActions.setSelectedPlan, (state, action) => ({ ...state, selectedPlanId: action.id })),
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
  on(JoinActions.setJoinFirestoreState, (state, action) => ({ ...state, isProcessing: true })),
  on(JoinActions.setJoinFirestoreStateSuccess, (state, action) => ({ ...state, isProcessing: false })),
  on(JoinActions.setJoinFirestoreStateFailiure, (state, action) => ({ ...state, error: action.error })),
  on(JoinActions.getJoinFirestoreState, (state, action) => ({ ...state, isLoading: true })),
  on(JoinActions.getJoinFirestoreStateSuccess, (state, action) => {
    return action.state
      ? {
          ...state,
          ...action.state[fromCore.additionalKey],
          isLoading: false
        }
      : {
          ...state,
          isLoading: false
        };
  }),
  on(JoinActions.getJoinFirestoreStateFailiure, (state, action) => ({ ...state, error: action.error })),
  on(JoinActions.resetJoinState, () => initialAdditionalState)
);

export const reducers: ActionReducerMap<JoinState> = {
  [fromCore.additionalKey]: additionalReducer
};
