import { createReducer, on } from '@ngrx/store';
import * as AlertActions from '../actions/alert.actions';
import { Alerts } from '@core/models';

export const alertFeatureKey = 'alert';

export interface State {
  alerts: Alerts;
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  alerts: null,
  isLoading: false,
  error: null
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
