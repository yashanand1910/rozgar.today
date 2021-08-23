import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '@core/reducers';
import * as fromRouter from '@ngrx/router-store';

export const selectRouter = createFeatureSelector<State, fromRouter.RouterReducerState<any>>('router');

export const {
  selectCurrentRoute, // select the current route
  selectQueryParam, // factory function to select a query param
  selectRouteParam // select the current url
} = fromRouter.getSelectors(selectRouter);
