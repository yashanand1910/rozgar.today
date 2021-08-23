import { createAction, props } from '@ngrx/store';
import { StepPath } from '@app/join/models';
import { NzStatusType } from 'ng-zorro-antd/steps';

export const nextStep = createAction('[Join] Next Step', props<{ setFirestoreState: boolean }>());

export const previousStep = createAction('[Join] Previous Step');

export const selectPlan = createAction('[Join] Select Plan', props<{ id: string }>());

export const refreshSteps = createAction('[Join] Refresh Steps');

export const setStepInfo = createAction(
  '[Join] Set Step Info',
  props<{ path: StepPath; description?: string; status?: NzStatusType; disabled?: boolean }>()
);

export const resetState = createAction('[Join] Reset Join State');
