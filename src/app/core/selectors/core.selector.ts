import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { additionalKey, AdditionalState, State } from '@core/reducers/core.reducer';
import * as ConstraintSelectors from './constraint.selectors';
import * as AlertSelectors from './alert.selectors';

export const selectRouter = createFeatureSelector<State, fromRouter.RouterReducerState<any>>('router');

export const {
  selectCurrentRoute, // select the current route
  selectQueryParam, // factory function to select a query param
  selectRouteParam // select the current url
} = fromRouter.getSelectors(selectRouter);

export const selectAdditionalState = createFeatureSelector<AdditionalState>(additionalKey);

export const selectError = createSelector(selectAdditionalState, (state) => state.error);

export const selectIsLoading = createSelector(
  AlertSelectors.selectAlertIsLoading,
  ConstraintSelectors.selectConstraintsIsLoading,
  (alerts, constraints) => alerts || constraints
);
