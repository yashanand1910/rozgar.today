import { createReducer, on } from '@ngrx/store';
import * as SignupActions from '../actions/signup.actions';

export const featureKey = 'signup';

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
  on(SignupActions.signUpFailiure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false
    };
  }),
  on(SignupActions.sendVerificationEmailFailiure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(SignupActions.sendVerificationEmailSuccess, (state, action) => {
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
