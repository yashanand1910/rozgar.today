import { createAction } from '@ngrx/store';

export * from './plan.actions';

export const nextJoinStep = createAction('[Join] Next Step');

export const previousJoinStep = createAction('[Join] Previous Step');
