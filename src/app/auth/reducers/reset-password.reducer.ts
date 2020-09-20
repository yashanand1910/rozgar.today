import { createReducer, on } from '@ngrx/store';
import * as ResetPasswordActions from '../actions/reset-password.actions';
import { User } from '@auth/models';

export const resetPasswordFeatureKey = 'resetPassword';

export interface State {
  user: Partial<User>;
  code: string;
  isLoading: boolean;
  isVerifying: boolean;
  info: string;
  warning: string;
  error: string;
}

export const initialState: State = {
  user: null,
  code: null,
  isLoading: false,
  isVerifying: true,
  info: null,
  warning: null,
  error: null
};

export const reducer = createReducer(
  initialState,

  on(ResetPasswordActions.verifyResetPasswordCode, (state) => initialState),
  on(ResetPasswordActions.verifyResetPasswordCodeSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      code: action.code,
      isVerifying: false
    };
  }),
  on(ResetPasswordActions.verifyResetPasswordCodeFailiure, (state, action) => {
    return {
      ...state,
      error: action.error.code,
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
  on(ResetPasswordActions.resetPasswordFailiure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error.code
    };
  })
);
