import { createReducer, on } from '@ngrx/store';
import { ConstraintActions } from '../actions';
import { Constraints } from '@core/models';
import firebase from 'firebase/compat/app';
import FirebaseError = firebase.FirebaseError;

export const featureKey = 'constraint';

export interface State {
  isLoading: boolean;
  error?: FirebaseError;
  constraints: Constraints;
}

export const initialState: State = {
  isLoading: false,
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
