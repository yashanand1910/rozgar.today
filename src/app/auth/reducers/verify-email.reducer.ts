import { createReducer, on } from '@ngrx/store';
import { VerifyEmailActions } from '../actions';
import { User } from '@auth/models';
import { extract } from '@i18n/services';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

export const featureKey = 'verifyEmail';

export interface State {
  user: Partial<User>;
  code?: string;
  isLoading: boolean;
  isVerifying: boolean;
  success?: string;
  error?: FirebaseError;
}

export const initialState: State = {
  user: null,
  isLoading: false,
  isVerifying: true
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
