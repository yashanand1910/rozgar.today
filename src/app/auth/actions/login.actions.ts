import { createAction, props } from '@ngrx/store';
import { LoginContext } from '@auth/models';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

export const logIn = createAction('[Login] Log In', props<{ context: LoginContext }>());

export const logInSuccess = createAction('[Login] Log In Success');

export const logInFailiure = createAction('[Login] Log In Failiure', props<{ error: FirebaseError }>());

export const clearLoginError = createAction('[Login] Clear Login Error');
