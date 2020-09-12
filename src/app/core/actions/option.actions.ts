import { createAction, props } from '@ngrx/store';
import { FirestoreCollection, Option } from '@core/models';

export const loadOption = createAction('[Option] Load Option', props<{ collection: FirestoreCollection }>());

export const loadOptionSuccess = createAction(
  '[Option] Load Option Success',
  props<{ collection: FirestoreCollection; options: Option[] }>()
);

export const loadOptionFailed = createAction(
  '[Option] Load Option Failed',
  props<{ collection: FirestoreCollection; error: Error }>()
);
