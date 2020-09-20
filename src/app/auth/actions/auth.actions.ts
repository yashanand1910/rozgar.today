import { createAction, props } from '@ngrx/store';
import { User } from '@auth/models';
import Error = firebase.auth.Error;

export const ensureLogOut = createAction('[Auth] Ensure Log Out');

export const logOut = createAction('[Auth] Log Out');

export const logOutSuccess = createAction('[Auth] Log Out Success');

export const logOutFailiure = createAction('[Auth] Log Out Failiure', props<{ error: Error }>());

export const getUser = createAction('[Auth] Get User');

export const getPartialUserSuccess = createAction('[Auth] Get Partial User Success', props<{ user: Partial<User> }>());

export const getUserSuccess = createAction('[Auth] Get User Success', props<{ user: User }>());

export const getUserFailiure = createAction('[Auth] Get User Failiure', props<{ error: Error }>());
