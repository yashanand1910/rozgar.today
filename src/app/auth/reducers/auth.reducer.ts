import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as fromRoot from '@core/reducers';
import * as fromSignup from './signup.reducer';
import * as fromLogin from './login.reducer';
import * as fromForgotPassword from './forgot-password.reducer';
import * as fromResetPassword from './reset-password.reducer';
import * as fromVerifyEmail from './verify-email.reducer';
import * as AuthActions from '../actions';
import { User } from '@auth/models';

export const authFeatureKey = 'auth';
export const additionalKey = 'additional';

export interface AdditionalState {
  user: User;
  isLoading: boolean;
  error: Error;
}

export interface AuthState {
  [fromSignup.signupFeatureKey]: fromSignup.State;
  [fromLogin.loginFeatureKey]: fromLogin.State;
  [fromForgotPassword.forgotPasswordFeatureKey]: fromForgotPassword.State;
  [fromResetPassword.resetPasswordFeatureKey]: fromResetPassword.State;
  [fromVerifyEmail.verifyEmailFeatureKey]: fromVerifyEmail.State;
  [additionalKey]: AdditionalState;
}

export interface State extends fromRoot.State {
  [authFeatureKey]: AuthState;
}

const initialAdditionalState: AdditionalState = {
  user: null,
  isLoading: false,
  error: null
};

export const additionalReducer = createReducer(
  initialAdditionalState,
  on(AuthActions.getUser, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null
    };
  }),
  on(AuthActions.getUserSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      user: action.user,
      error: null
    };
  }),
  on(AuthActions.getPartialUserSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      user: {
        ...state.user,
        ...action.user
      }
    };
  }),
  on(AuthActions.getUserFailed, (state, action) => {
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
  [additionalKey]: additionalReducer
};
