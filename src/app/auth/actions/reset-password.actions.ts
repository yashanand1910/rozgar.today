import { createAction, props } from '@ngrx/store';
import { ResetPasswordContext, User } from '@auth/models';
import Error = firebase.auth.Error;

export const verifyResetPasswordCode = createAction('[ResetPassword] Verify Code');

export const verifyResetPasswordCodeSuccess = createAction(
  '[ResetPassword] Verify Code Success',
  props<{ user: Partial<User>; code: string }>()
);

export const verifyResetPasswordCodeFailiure = createAction(
  '[ResetPassword] Verify Code Failiure',
  props<{ error: Error }>()
);

export const resetPassword = createAction('[ResetPassword] Reset Password', props<{ context: ResetPasswordContext }>());

export const resetPasswordSuccess = createAction('[ResetPassword] Reset Password Success');

export const resetPasswordFailiure = createAction('[ResetPassword] Reset Password Failiure', props<{ error: Error }>());

export const clearResetPasswordError = createAction('[ResetPassword] Clear Error');
