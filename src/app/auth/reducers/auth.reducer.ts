import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as fromCore from '@core/reducers/core.reducer';
import * as fromSignup from './signup.reducer';
import * as fromLogin from './login.reducer';
import * as fromForgotPassword from './forgot-password.reducer';
import * as fromResetPassword from './reset-password.reducer';
import * as fromVerifyEmail from './verify-email.reducer';
import { AuthActions } from '../actions';
import { User } from '@auth/models';
import firebase from 'firebase/compat/app';
import FirebaseError = firebase.FirebaseError;

export const featureKey = 'auth';

export interface AdditionalState {
  user: User;
  isLoading: boolean;
  isReloading: boolean;
  isLoaded: boolean; // To indicate whether this state is updated with the Firebase user state
  error?: FirebaseError;
}

export interface AuthState {
  [fromSignup.featureKey]: fromSignup.State;
  [fromLogin.featureKey]: fromLogin.State;
  [fromForgotPassword.featureKey]: fromForgotPassword.State;
  [fromResetPassword.featureKey]: fromResetPassword.State;
  [fromVerifyEmail.featureKey]: fromVerifyEmail.State;
  [fromCore.additionalKey]: AdditionalState;
}

export interface State extends fromCore.State {
  [featureKey]: AuthState;
}

export const initialAdditionalState: AdditionalState = {
  user: null,
  isLoading: true,
  isReloading: false,
  isLoaded: false
};

export const additionalReducer = createReducer(
  initialAdditionalState,
  on(AuthActions.loadAuth, (state) => {
    return {
      ...state,
      error: null
    };
  }),
  on(AuthActions.loadAuthSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      user: action.user,
      error: null
    };
  }),
  on(AuthActions.getPartialUserSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      user: {
        ...state.user,
        ...action.user
      }
    };
  }),
  on(AuthActions.loadAuthFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(AuthActions.logOut, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(AuthActions.logOutSuccess, (state) => {
    return {
      ...state,
      isLoading: false,
      error: null
    };
  }),
  on(AuthActions.startReloadingAuth, (state) => ({ ...state, isReloading: true })),
  on(AuthActions.stopReloadingAuth, (state) => ({ ...state, isReloading: false }))
);

export const reducers: ActionReducerMap<AuthState> = {
  [fromLogin.featureKey]: fromLogin.reducer,
  [fromSignup.featureKey]: fromSignup.reducer,
  [fromForgotPassword.featureKey]: fromForgotPassword.reducer,
  [fromResetPassword.featureKey]: fromResetPassword.reducer,
  [fromVerifyEmail.featureKey]: fromVerifyEmail.reducer,
  [fromCore.additionalKey]: additionalReducer
};
