import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromConstraint from '../reducers/constraint.reducer';
import { Constraints } from '@core/models';

export const selectConstraintState = createFeatureSelector<fromConstraint.State>(fromConstraint.constraintFeatureKey);

export const selectConstraints = createSelector(selectConstraintState, (state) => state.constraints);

export const selectConstraint = createSelector(selectConstraints, (state: Constraints, props: { name: string }) =>
  state ? state[props.name] : null
);

export const selectConstraintsIsLoading = createSelector(selectConstraintState, (state) => state.isLoading);

export const selectConstraintsError = createSelector(selectConstraintState, (state) => state.error);
