import { createAction, props } from '@ngrx/store';
import { Constraints } from '@core/models';
import firebase from 'firebase/compat/app';
import FirebaseError = firebase.FirebaseError;

export const loadConstraints = createAction('[Constraint] Load Constraints');

export const loadConstraintsSuccess = createAction(
  '[Constraint] Load Constraints Success',
  props<{ constraints: Constraints }>()
);

export const loadConstraintsFailure = createAction(
  '[Constraint] Load Constraints Failure',
  props<{ error: FirebaseError }>()
);
