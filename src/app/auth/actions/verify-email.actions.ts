import { createAction, props } from '@ngrx/store';
import { User } from '@auth/models';
import firebase from 'firebase/compat/app';
import FirebaseError = firebase.FirebaseError;

export const verifyEmailCode = createAction('[VerifyEmail] Verify Email Code');

export const verifyEmailCodeSuccess = createAction(
  '[VerifyEmail] Verify Email Code Success',
  props<{ user: Partial<User>; code: string }>()
);

export const verifyEmailCodeFailure = createAction(
  '[VerifyEmail] Verify Email Code Failure',
  props<{ error: FirebaseError }>()
);

export const verifyEmail = createAction('[VerifyEmail] Verify Email', props<{ code: string }>());

export const verifyEmailSuccess = createAction('[VerifyEmail] Verify Email Success');

export const verifyEmailFailure = createAction('[VerifyEmail] Verify Email Failure', props<{ error: FirebaseError }>());
