import { createReducer, on } from '@ngrx/store';
import * as ConstraintActions from '../actions/constraint.actions';
import { Constraints } from '@core/models';

export const constraintFeatureKey = 'constraint';

export interface State {
  isLoading: boolean;
  error: string;
  constraints: Constraints;
}

export const initialState: State = {
  isLoading: false,
  error: null,
  constraints: null
};

export const reducer = createReducer(
  initialState,

  on(ConstraintActions.loadConstraints, (state) => ({ ...state, isLoading: true })),
  on(ConstraintActions.loadConstraintsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    error: null,
    constraints: action.constraints
  })),
  on(ConstraintActions.loadConstraintsFailure, (state, action) => ({
    ...state,
    error: action.error
  }))
);
