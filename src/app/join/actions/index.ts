import { createAction, props } from '@ngrx/store';
import { Step } from '@app/join/models';

export * from './plan.actions';

export const nextStep = createAction('[Join] Next Step');

export const setCurrentStepFromPath = createAction('[Join] Set Current Step', props<{ path: Step['path'] }>());
