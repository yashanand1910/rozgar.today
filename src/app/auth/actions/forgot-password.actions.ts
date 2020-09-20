import { createAction, props } from '@ngrx/store';
import { ForgotPasswordContext } from '@auth/models';
import Error = firebase.auth.Error;

export const forgotPassword = createAction(
  '[ForgotPassword] Forgot Password',
  props<{ context: ForgotPasswordContext }>()
);

export const forgotPasswordSuccess = createAction('[ForgotPassword] Forgot Password Success');

export const forgotPasswordFailiure = createAction(
  '[ForgotPassword] Forgot Password Failiure',
  props<{ error: Error }>()
);

export const clearForgotPasswordInfo = createAction('[ForgotPassword] Clear Info');

export const clearForgotPasswordError = createAction('[ForgotPassword] Clear Error');
