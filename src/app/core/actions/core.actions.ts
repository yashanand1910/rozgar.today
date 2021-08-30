import { createAction, props } from '@ngrx/store';
import { State } from '@core/reducers';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

export const initialize = createAction('[Core] Initialize');

export const networkError = createAction('[Core] Network Error');

export const showLoadingMessage = createAction('[Core] Show Loading Message');

export const clearLoadingMessage = createAction('[Core] Clear Loading Message');

export const getFirestoreState = createAction('[Core] Get Firestore State');

export const getFirestoreStateSuccess = createAction(
  '[Core] Get Firestore State Success',
  (payload: { state: Partial<State> } = { state: null }) => payload
);

export const getFirestoreStateFailure = createAction(
  '[Core] Get Firestore State Failure',
  props<{ error: FirebaseError }>()
);

export const setFirestoreState = createAction(
  '[Core] Set Firestore State',
  (payload: { firstTime: boolean } = { firstTime: false }) => payload
);

export const setFirestoreStateSuccess = createAction(
  '[Core] Set Firestore State Success',
  (payload: { firstTime: boolean } = { firstTime: false }) => payload
);

export const setFirestoreStateFailure = createAction(
  '[Core] Set Firestore State Failure',
  props<{ error: FirebaseError }>()
);
