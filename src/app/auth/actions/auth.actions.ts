import { createAction, props } from '@ngrx/store';
import { LoginContext, User } from '@auth/models';
import Error = firebase.auth.Error;

export const logIn = createAction('[Auth] Log In', props<{ loginContext: LoginContext }>());

export const logOut = createAction('[Auth] Log Out');

export const ensureLogOut = createAction('[Auth] Ensure Log Out');

export const logOutSuccess = createAction('[Auth] Log Out Success');

export const logOutFailed = createAction('[Auth] Log Out Failed', props<{ error: Error }>());

export const logInSuccess = createAction('[Auth] Log In Success');

export const logInFailed = createAction('[Auth] Log In Failed', props<{ error: Error }>());

export const getUser = createAction('[Auth] Get User');

export const getPartialUserSuccess = createAction('[Auth] Get Partial User Success', props<{ user: Partial<User> }>());

export const getUserSuccess = createAction('[Auth] Get User Success', props<{ user: User }>());

export const getUserFailed = createAction('[Auth] Get User Failed', props<{ error: Error }>());
