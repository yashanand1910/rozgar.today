import { createReducer, on } from '@ngrx/store';
import * as LoginActions from '../actions/login.actions';

export const loginFeatureKey = 'login';

export interface State {
  isLoading: boolean;
  info: string;
  warning: string;
  error: string;
}

export const initialState: State = {
  isLoading: false,
  info: null,
  warning: null,
  error: null
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
