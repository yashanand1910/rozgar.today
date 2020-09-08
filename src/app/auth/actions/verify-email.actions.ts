import { createAction, props } from '@ngrx/store';
import { User } from '@auth/models';
import Error = firebase.auth.Error;

export const verifyEmailCode = createAction('[VerifyEmail] Verify Email Code');

export const verifyEmailCodeSuccess = createAction(
  '[VerifyEmail] Verify Email Code Success',
  props<{ user: Partial<User>; code: string }>()
);

export const verifyEmailCodeFailed = createAction('[VerifyEmail] Verify Email Code Failed', props<{ error: Error }>());

export const verifyEmail = createAction('[VerifyEmail] Verify Email', props<{ code: string }>());

export const verifyEmailSuccess = createAction('[VerifyEmail] Verify Email Success');

export const verifyEmailFailed = createAction('[VerifyEmail] Verify Email Failed', props<{ error: Error }>());
