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
      path: StepPath.Plan,
      icon: 'file-protect'
    },
    {
      title: extract('Account'),
      path: StepPath.Account,
      icon: 'form'
    },
    {
      title: extract('Payment'),
      path: StepPath.Payment,
      icon: 'credit-card'
    },
    {
      title: extract('Resume'),
      path: StepPath.Resume,
      icon: 'check-square'
    }
  ],
  isLoading: false,
  isProcessing: false,
  selectedPlanId: null
};

const additionalReducer = createReducer(
  initialAdditionalState,
  on(JoinActions.setSelectedPlan, (state, action) => ({ ...state, selectedPlanId: action.id })),
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
  on(JoinActions.getJoinFirestoreStateFailiure, (state, action) => ({ ...state, error: action.error }))
);

export const reducers: ActionReducerMap<JoinState> = {
  [fromCore.additionalKey]: additionalReducer
};
