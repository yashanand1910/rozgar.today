import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as fromCore from '@core/reducers/core.reducer';
import * as fromSignup from './signup.reducer';
import * as fromLogin from './login.reducer';
import * as fromForgotPassword from './forgot-password.reducer';
import * as fromResetPassword from './reset-password.reducer';
import * as fromVerifyEmail from './verify-email.reducer';
import * as AuthActions from '../actions';
import { User } from '@auth/models';

export const authFeatureKey = 'auth';

export interface AdditionalState {
  user: User;
  isLoading: boolean;
  isReloading: boolean;
  isInitialized: boolean; // To indicate whether this state is updated with the Firebase user state
  error: string;
}

export interface AuthState {
  [fromSignup.signupFeatureKey]: fromSignup.State;
  [fromLogin.loginFeatureKey]: fromLogin.State;
  [fromForgotPassword.forgotPasswordFeatureKey]: fromForgotPassword.State;
  [fromResetPassword.resetPasswordFeatureKey]: fromResetPassword.State;
  [fromVerifyEmail.verifyEmailFeatureKey]: fromVerifyEmail.State;
  [fromCore.additionalKey]: AdditionalState;
}

export interface State extends fromCore.State {
  [authFeatureKey]: AuthState;
}

export const initialAdditionalState: AdditionalState = {
  user: null,
  isLoading: true,
  isReloading: false,
  isInitialized: false,
  error: null
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
      isInitialized: true,
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
  on(AuthActions.loadAuthFailiure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  }),
  on(AuthActions.logOut, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(AuthActions.logOutSuccess, (state, action) => {
    return {
      ...state,
      error: null
    };
  }),
  on(AuthActions.startReloadingAuth, (state) => ({ ...state, isReloading: true })),
  on(AuthActions.stopReloadingAuth, (state) => ({ ...state, isReloading: false }))
);

export const reducers: ActionReducerMap<AuthState> = {
  [fromLogin.loginFeatureKey]: fromLogin.reducer,
  [fromSignup.signupFeatureKey]: fromSignup.reducer,
  [fromForgotPassword.forgotPasswordFeatureKey]: fromForgotPassword.reducer,
  [fromResetPassword.resetPasswordFeatureKey]: fromResetPassword.reducer,
  [fromVerifyEmail.verifyEmailFeatureKey]: fromVerifyEmail.reducer,
  [fromCore.additionalKey]: additionalReducer
};
