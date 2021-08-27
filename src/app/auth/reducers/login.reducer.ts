import { createReducer, on } from '@ngrx/store';
import { LoginActions } from '../actions';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

export const featureKey = 'login';

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

  on(LoginActions.logIn, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(LoginActions.logInSuccess, (state) => {
    return {
      ...state,
      error: null,
      isLoading: false
    };
  }),
  on(LoginActions.logInFailiure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false
    };
  }),
  on(LoginActions.clearLoginError, (state) => {
    return {
      ...state,
      error: null
    };
  })
);
