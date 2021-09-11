import { createAction, props } from '@ngrx/store';
import { State } from '@core/reducers';
import firebase from 'firebase/compat/app';
import FirebaseError = firebase.FirebaseError;
import { Config } from '@core/models';

export const initialize = createAction('[Core] Initialize');

export const networkError = createAction('[Core] Network error');

export const showLoadingMessage = createAction('[Core] Show loading message');

export const clearLoadingMessage = createAction('[Core] Clear loading message');

/*************************
 * Firestore State Actions
 *************************/

export const getFirestoreState = createAction('[Core] Get firestore state');

export const getFirestoreStateSuccess = createAction(
  '[Core] Get firestore state success',
  (payload: { state: Partial<State> } = { state: null }) => payload
);

export const getFirestoreStateFailure = createAction(
  '[Core] Get firestore state failure',
  props<{ error: FirebaseError }>()
);

export const setFirestoreState = createAction(
  '[Core] Set firestore state',
  (payload: { firstTime: boolean } = { firstTime: false }) => payload
);

export const setFirestoreStateSuccess = createAction(
  '[Core] Set firestore state success',
  (payload: { firstTime: boolean } = { firstTime: false }) => payload
);

export const setFirestoreStateFailure = createAction(
  '[Core] Set firestore state failure',
  props<{ error: FirebaseError }>()
);

/*************************
 * Config Actions
 *************************/

export const getConfig = createAction('[Core] Get config');

export const getConfigSuccess = createAction('[Core] Get config success', props<{ config: Config }>());

export const getConfigFailure = createAction('[Core] Get config failure', props<{ error: FirebaseError }>());
