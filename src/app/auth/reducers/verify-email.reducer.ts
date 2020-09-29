import { createReducer, on } from '@ngrx/store';
import * as VerifyEmailActions from '../actions/verify-email.actions';
import { User } from '@auth/models';
import { extract } from '@i18n/services';

export const verifyEmailFeatureKey = 'verifyEmail';

export interface State {
  user: Partial<User>;
  code: string;
  isLoading: boolean;
  isVerifying: boolean;
  success: string;
  error: string;
}

export const initialState: State = {
  user: null,
  code: null,
  isLoading: false,
  isVerifying: true,
  success: null,
  error: null
};

export const reducer = createReducer(
  initialState,

  on(VerifyEmailActions.verifyEmailCode, (state) => initialState),
  on(VerifyEmailActions.verifyEmailCodeSuccess, (state, action) => {
    return {
      ...state,
      isVerifying: false,
      code: action.code,
      user: action.user
    };
  }),
  on(VerifyEmailActions.verifyEmailCodeFailiure, (state, action) => {
    return {
      ...state,
      isVerifying: false,
      error: action.error
    };
  }),
  on(VerifyEmailActions.verifyEmail, (state, action) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(VerifyEmailActions.verifyEmailSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      success: extract('Account successfully verified. You may close this window.'),
      error: null
    };
  }),
  on(VerifyEmailActions.verifyEmailFailiure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      success: null,
      error: action.error
    };
  })
);
