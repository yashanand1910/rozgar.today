import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCollection from '../reducers/collection.reducer';
import { Collection } from '@core/models';

export const selectState = <T>(collection: Collection) => createFeatureSelector<fromCollection.State<T>>(collection);

export const entitySelectors = <T>(collection: Collection) =>
  fromCollection.adapter<T>().getSelectors<fromCollection.State<T>>(selectState<T>(collection));

export const selectIsLoading = <T>(collection: Collection) =>
  createSelector(selectState<T>(collection), (state) => state?.isLoading);

export const selectError = <T>(collection: Collection) =>
  createSelector(selectState<T>(collection), (state) => state?.error);

export const selectSelectedId = <T>(collection: Collection) =>
  createSelector(selectState<T>(collection), (state) => state?.selectedId);
