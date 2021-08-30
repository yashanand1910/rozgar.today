import { createReducer, on } from '@ngrx/store';
import { ResetPasswordActions } from '../actions';
import { User } from '@auth/models';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

export const featureKey = 'resetPassword';

export interface State {
  user: Partial<User>;
  code?: string;
  isLoading: boolean;
  isVerifying: boolean;
  info?: string;
  warning?: string;
  error?: FirebaseError;
}

export const initialState: State = {
  user: null,
  isLoading: false,
  isVerifying: true
};

export const reducer = createReducer(
  initialState,

  on(ResetPasswordActions.verifyResetPasswordCode, () => initialState),
  on(ResetPasswordActions.verifyResetPasswordCodeSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      code: action.code,
      isVerifying: false
    };
  }),
  on(ResetPasswordActions.verifyResetPasswordCodeFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isVerifying: false
    };
  }),
  on(ResetPasswordActions.resetPassword, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(ResetPasswordActions.resetPasswordSuccess, (state) => {
    return {
      ...state,
      isLoading: false,
      error: null
    };
  }),
  on(ResetPasswordActions.resetPasswordFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  })
);
