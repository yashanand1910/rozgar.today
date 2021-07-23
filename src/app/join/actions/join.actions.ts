import { createAction, props } from '@ngrx/store';
import { JoinFirestoreState } from '@app/join/reducers';
import { StepPath } from '@app/join/models';
import { NzStatusType } from 'ng-zorro-antd/steps';

export const nextJoinStep = createAction('[Join] Next Step', props<{ setFirestoreState: boolean }>());

export const previousJoinStep = createAction('[Join] Previous Step');

export const setSelectedPlan = createAction('[Join] Set Selected Plan', props<{ id: string }>());

export const refreshSteps = createAction('[Join] Refresh Steps');

export const setStepInfo = createAction(
  '[Join] Set Step Info',
  props<{ path: StepPath; description?: string; status?: NzStatusType; disabled?: boolean }>()
);

export const resetJoinState = createAction('[Join] Reset Join State');

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
