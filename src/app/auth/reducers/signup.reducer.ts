import { createReducer, on } from '@ngrx/store';
import { SignupActions } from '../actions';
import firebase from 'firebase/compat/app';
import FirebaseError = firebase.FirebaseError;

export const featureKey = 'signup';

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
  on(SignupActions.signUp, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(SignupActions.signUpSuccess, (state) => {
    return {
      ...state,
      error: null,
      isLoading: false
    };
  }),
  on(SignupActions.signUpFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false
    };
  }),
  on(SignupActions.sendVerificationEmailFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(SignupActions.sendVerificationEmailSuccess, (state) => {
    return {
      ...state,
      error: null
    };
  }),
  on(SignupActions.clearSignupError, (state) => {
    return {
      ...state,
      error: null
    };
  })
);
