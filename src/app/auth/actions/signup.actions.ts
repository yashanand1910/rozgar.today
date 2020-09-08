import { createAction, props } from '@ngrx/store';
import { SignupContext } from '@auth/models';
import Error = firebase.auth.Error;

export const signUp = createAction('[Signup] Sign Up', props<{ context: SignupContext }>());

export const signUpSuccess = createAction('[Signup] Sign Up Success');

export const signUpFailed = createAction('[Signup] Sign Up Failed', props<{ error: Error }>());

export const clearSignupError = createAction('[Signup] Clear Error');

export const sendVerificationEmail = createAction('[Signup] Send Verification Email');

export const sendVerificationEmailSuccess = createAction('[Signup] Send Verification Email Success');

export const sendVerificationEmailFailed = createAction(
  '[Signup] Send Verification Email Failed',
  props<{ error: Error }>()
);
