import { createAction, props } from '@ngrx/store';
import { JoinFirestoreState } from '@app/join/reducers';

export const nextJoinStep = createAction('[Join] Next Step');

export const previousJoinStep = createAction('[Join] Previous Step');

export const setSelectedPlan = createAction('[Join] Set Selected Plan', props<{ id: string }>());

/*
 * Actions for state stored in Firestore
 * */

export const setJoinFirestoreState = createAction('[Join] Set Firestore State');

export const setJoinFirestoreStateSuccess = createAction('[Join] Set Firestore State Success');

export const setJoinFirestoreStateFailiure = createAction(
  '[Join] Set Firestore State Failiure',
  props<{ error: string }>()
);

export const getJoinFirestoreState = createAction('[Join] Get Firestore State');

export const getJoinFirestoreStateSuccess = createAction(
  '[Join] Get Firestore State Success',
  props<{ state?: JoinFirestoreState }>()
);

export const getJoinFirestoreStateFailiure = createAction(
  '[Join] Get Firestore State Failiure',
  props<{ error: string }>()
);
