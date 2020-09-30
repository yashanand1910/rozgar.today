import { createAction, props } from '@ngrx/store';
import { User } from '@auth/models';

export const verifyEmailCode = createAction('[VerifyEmail] Verify Email Code');

export const verifyEmailCodeSuccess = createAction(
  '[VerifyEmail] Verify Email Code Success',
  props<{ user: Partial<User>; code: string }>()
);

export const verifyEmailCodeFailiure = createAction(
  '[VerifyEmail] Verify Email Code Failiure',
  props<{ error: string }>()
);

export const verifyEmail = createAction('[VerifyEmail] Verify Email', props<{ code: string }>());

export const verifyEmailSuccess = createAction('[VerifyEmail] Verify Email Success');

export const verifyEmailFailiure = createAction('[VerifyEmail] Verify Email Failiure', props<{ error: string }>());
