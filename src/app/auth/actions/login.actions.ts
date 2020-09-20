import { createAction, props } from '@ngrx/store';
import { LoginContext } from '@auth/models';
import Error = firebase.auth.Error;

export const logIn = createAction('[Login] Log In', props<{ context: LoginContext }>());

export const logInSuccess = createAction('[Login] Log In Success');

export const logInFailiure = createAction('[Login] Log In Failiure', props<{ error: Error }>());

export const clearLoginError = createAction('[Login] Clear Login Error');
