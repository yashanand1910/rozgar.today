import { createAction, props } from '@ngrx/store';
import { Plan } from '@app/join/models';

export const loadPlans = createAction('[Plan] Load Plans');

export const loadPlansSuccess = createAction('[Plan] Load Plans Success', props<{ plans: Plan[] }>());

export const loadPlansFailure = createAction('[Plan] Load Plans Failure', props<{ error: Error }>());

export const setCurrentPlan = createAction('[Plan] Set Current Plan', props<{ id: Plan['id'] }>());
