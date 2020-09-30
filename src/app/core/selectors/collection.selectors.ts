import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCollection from '../reducers/collection.reducer';
import { Collection } from '@core/models';

export const selectCollectionState = <T>(collection: Collection) =>
  createFeatureSelector<fromCollection.State<T>>(collection);

export const entitySelectors = <T>(collection: Collection) =>
  fromCollection.adapter<T>().getSelectors<fromCollection.State<T>>(selectCollectionState<T>(collection));

export const selectCollectionIsLoading = <T>(collection: Collection) =>
  createSelector(selectCollectionState<T>(collection), (state) => state?.isLoading);

export const selectCollectionError = <T>(collection: Collection) =>
  createSelector(selectCollectionState<T>(collection), (state) => state?.error);

export const selectCollectionSelectedId = <T>(collection: Collection) =>
  createSelector(selectCollectionState<T>(collection), (state) => state?.selectedId);
