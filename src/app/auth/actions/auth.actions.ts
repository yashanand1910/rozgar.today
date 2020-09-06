import { createAction, props } from '@ngrx/store';
import { User } from '@auth/models';
import Error = firebase.auth.Error;

export const ensureLogOut = createAction('[Auth] Ensure Log Out');

export const logOut = createAction('[Auth] Log Out');

export const logOutSuccess = createAction('[Auth] Log Out Success');

export const logOutFailed = createAction('[Auth] Log Out Failed', props<{ error: Error }>());

export const getUser = createAction('[Auth] Get User');

export const getPartialUserSuccess = createAction('[Auth] Get Partial User Success', props<{ user: Partial<User> }>());

export const getUserSuccess = createAction('[Auth] Get User Success', props<{ user: User }>());

export const getUserFailed = createAction('[Auth] Get User Failed', props<{ error: Error }>());
