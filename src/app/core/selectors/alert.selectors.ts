import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlert from '../reducers/alert.reducer';

export const selectAlertState = createFeatureSelector<fromAlert.State>(fromAlert.alertFeatureKey);

export const selectAlerts = createSelector(selectAlertState, (state) => state.alerts);

export const selectAlert = createSelector(
  selectAlerts,
  (state: fromAlert.State['alerts'], props: { component: string }) => (state ? state[props.component] : null)
);

export const selectAlertIsLoading = createSelector(selectAlertState, (state) => state.isLoading);

export const selectAlertError = createSelector(selectAlertState, (state) => state.error);
