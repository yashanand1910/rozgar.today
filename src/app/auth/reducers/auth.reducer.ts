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
  // To indicate whether this state is updated with the Firebase user state
  isInitialized: boolean;
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
  isInitialized: false,
  error: null
};

export const additionalReducer = createReducer(
  initialAdditionalState,
  on(AuthActions.getUser, (state) => {
    return {
      ...state,
      error: null
    };
  }),
  on(AuthActions.getUserSuccess, (state, action) => {
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
  on(AuthActions.getUserFailiure, (state, action) => {
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
  })
);

export const reducers: ActionReducerMap<AuthState> = {
  [fromLogin.loginFeatureKey]: fromLogin.reducer,
  [fromSignup.signupFeatureKey]: fromSignup.reducer,
  [fromForgotPassword.forgotPasswordFeatureKey]: fromForgotPassword.reducer,
  [fromResetPassword.resetPasswordFeatureKey]: fromResetPassword.reducer,
  [fromVerifyEmail.verifyEmailFeatureKey]: fromVerifyEmail.reducer,
  [fromCore.additionalKey]: additionalReducer
};
