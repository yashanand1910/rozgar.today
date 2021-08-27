import { createReducer, on } from '@ngrx/store';
import { ForgotPasswordActions } from '../actions';
import { extract } from '@i18n/services';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

export const featureKey = 'forgotPassword';

export interface State {
  isLoading: boolean;
  info?: string;
  warning?: string;
  error?: FirebaseError;
}

export const initialState: State = {
  isLoading: false
};

export const reducer = createReducer(
  initialState,

  on(ForgotPasswordActions.forgotPassword, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),

  on(ForgotPasswordActions.forgotPasswordSuccess, (state) => {
    return {
      ...state,
      isLoading: false,
      info: extract('An email has been sent with instructions to reset your password. Please check your inbox/spam.'),
      error: null
    };
  }),

  on(ForgotPasswordActions.forgotPasswordFailiure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      info: null,
      error: action.error
    };
  }),

  on(ForgotPasswordActions.clearForgotPasswordError, (state, action) => {
    return {
      ...state,
      error: null
    };
  }),

  on(ForgotPasswordActions.clearForgotPasswordInfo, (state, action) => {
    return {
      ...state,
      info: null
    };
  })
);
