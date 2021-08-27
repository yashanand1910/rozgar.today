import { createReducer, on } from '@ngrx/store';
import { AlertActions } from '../actions';
import { Alerts } from '@core/models';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

export const featureKey = 'alert';

export interface State {
  alerts: Alerts;
  isLoading: boolean;
  error?: FirebaseError;
}

export const initialState: State = {
  alerts: null,
  isLoading: false
};

export const reducer = createReducer(
  initialState,

  on(AlertActions.loadAlerts, (state) => ({ ...state, isLoading: true })),
  on(AlertActions.loadAlertsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    error: null,
    alerts: action.alerts
  })),
  on(AlertActions.loadAlertsFailiure, (state, action) => ({ ...state, error: action.error }))
);
