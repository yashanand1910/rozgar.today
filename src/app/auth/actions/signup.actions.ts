import { createAction, props } from '@ngrx/store';
import { SignupContext } from '@auth/models';
import firebase from 'firebase/compat/app';
import FirebaseError = firebase.FirebaseError;

export const signUp = createAction('[Signup] Sign Up', props<{ context: SignupContext }>());

export const signUpSuccess = createAction('[Signup] Sign Up Success');

export const signUpFailure = createAction('[Signup] Sign Up Failure', props<{ error: FirebaseError }>());

export const clearSignupError = createAction('[Signup] Clear Error');

export const sendVerificationEmail = createAction('[Signup] Send Verification Email');

export const sendVerificationEmailSuccess = createAction('[Signup] Send Verification Email Success');

export const sendVerificationEmailFailure = createAction(
  '[Signup] Send Verification Email Failure',
  props<{ error: FirebaseError }>()
);
