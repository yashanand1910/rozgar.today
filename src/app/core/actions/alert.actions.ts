import { createAction, props } from '@ngrx/store';
import { Alerts } from '@core/models';
import firebase from 'firebase/compat/app';
import FirebaseError = firebase.FirebaseError;

export const loadAlerts = createAction('[Alert] Load Alerts');

export const loadAlertsSuccess = createAction('[Alert] Load Alerts Success', props<{ alerts: Alerts }>());

export const loadAlertsFailure = createAction('[Alert] Load Alerts Failure', props<{ error: FirebaseError }>());
