import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { State, AdditionalState, additionalKey } from '@core/reducers/core.reducer';

export const selectRouter = createFeatureSelector<State, fromRouter.RouterReducerState<any>>('router');

export const {
  selectCurrentRoute, // select the current route
  selectQueryParam, // factory function to select a query param
  selectRouteParam // select the current url
} = fromRouter.getSelectors(selectRouter);

export const selectAdditionalState = createFeatureSelector<State, AdditionalState>(additionalKey);

export const selectError = createSelector(selectAdditionalState, (state) => state.error);
