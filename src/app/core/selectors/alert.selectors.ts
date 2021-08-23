import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlert from '../reducers/alert.reducer';

export const selectState = createFeatureSelector<fromAlert.State>(fromAlert.featureKey);

export const selectAll = createSelector(selectState, (state) => state.alerts);

export const select = createSelector(
  selectAll,
  (state: fromAlert.State['alerts'], props: { component: string }) => (state ? state[props.component] : null)
);

export const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

export const selectError = createSelector(selectState, (state) => state.error);
