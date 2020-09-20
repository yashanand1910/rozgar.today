import { createAction, props } from '@ngrx/store';
import { SignupContext } from '@auth/models';
import Error = firebase.auth.Error;

export const signUp = createAction('[Signup] Sign Up', props<{ context: SignupContext }>());

export const signUpSuccess = createAction('[Signup] Sign Up Success');

export const signUpFailiure = createAction('[Signup] Sign Up Failiure', props<{ error: Error }>());

export const clearSignupError = createAction('[Signup] Clear Error');

export const sendVerificationEmail = createAction('[Signup] Send Verification Email');

export const sendVerificationEmailSuccess = createAction('[Signup] Send Verification Email Success');

export const sendVerificationEmailFailiure = createAction(
  '[Signup] Send Verification Email Failiure',
  props<{ error: Error }>()
);
