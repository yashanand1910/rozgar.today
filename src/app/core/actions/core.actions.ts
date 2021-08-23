import { createAction, props } from '@ngrx/store';
import { State } from '@core/reducers';

export const initialize = createAction('[Core] Initialize');

export const networkError = createAction('[Core] Network Error');

export const showLoadingMessage = createAction('[Core] Show Loading Message');

export const clearLoadingMessage = createAction('[Core] Clear Loading Message');

export const getFirestoreState = createAction('[Core] Get Firestore State');

export const getFirestoreStateSuccess = createAction(
  '[Core] Get Firestore State Success',
  props<{ state?: Partial<State> }>()
);

export const getFirestoreStateFailiure = createAction(
  '[Core] Get Firestore State Failiure',
  props<{ error: string }>()
);

export const setFirestoreState = createAction('[Core] Set Firestore State');

export const setFirestoreStateSuccess = createAction('[Core] Set Firestore State Success');

export const setFirestoreStateFailiure = createAction(
  '[Core] Set Firestore State Failiure',
  props<{ error: string }>()
);
