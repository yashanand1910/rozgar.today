export * from './option.selectors';

import { createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { State } from '@core/reducers';

export const selectRouter = createFeatureSelector<State, fromRouter.RouterReducerState<any>>('router');

export const {
  selectCurrentRoute, // select the current route
  selectQueryParam, // factory function to select a query param
  selectRouteParam // select the current url
} = fromRouter.getSelectors(selectRouter);
