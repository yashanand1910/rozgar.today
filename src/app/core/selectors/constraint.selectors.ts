import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromConstraint from '../reducers/constraint.reducer';
import { Constraints } from '@core/models';

export const selectState = createFeatureSelector<fromConstraint.State>(fromConstraint.featureKey);

export const selectAll = createSelector(selectState, (state) => state.constraints);

export const select = createSelector(selectAll, (state: Constraints, props: { name: string }) =>
  state ? state[props.name] : null
);

export const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

export const selectError = createSelector(selectState, (state) => state.error);
