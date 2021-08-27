import { createAction, props } from '@ngrx/store';
import { User } from '@auth/models';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

export const ensureLogOut = createAction('[Auth] Ensure Log Out');

export const logOut = createAction('[Auth] Log Out');

export const logOutSuccess = createAction('[Auth] Log Out Success');

export const logOutFailiure = createAction('[Auth] Log Out Failiure', props<{ error: FirebaseError }>());

export const loadAuth = createAction('[Auth] Load Auth');

export const getPartialUserSuccess = createAction('[Auth] Get Partial User Success', props<{ user: Partial<User> }>());

export const loadAuthSuccess = createAction('[Auth] Load Auth Success', props<{ user: User }>());

export const loadAuthFailiure = createAction('[Auth] Load Auth Failiure', props<{ error: FirebaseError }>());

export const startReloadingAuth = createAction('[Auth] Start Reloading Auth');

export const stopReloadingAuth = createAction('[Auth] Stop Reloading Auth');
