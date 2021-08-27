import { createAction, props } from '@ngrx/store';
import { Alerts } from '@core/models';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

export const loadAlerts = createAction('[Alert] Load Alerts');

export const loadAlertsSuccess = createAction('[Alert] Load Alerts Success', props<{ alerts: Alerts }>());

export const loadAlertsFailiure = createAction('[Alert] Load Alerts Failiure', props<{ error: FirebaseError }>());
