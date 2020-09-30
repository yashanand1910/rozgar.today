import { createAction, props } from '@ngrx/store';
import { LoginContext } from '@auth/models';

export const logIn = createAction('[Login] Log In', props<{ context: LoginContext }>());

export const logInSuccess = createAction('[Login] Log In Success');

export const logInFailiure = createAction('[Login] Log In Failiure', props<{ error: string }>());

export const clearLoginError = createAction('[Login] Clear Login Error');
