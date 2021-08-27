import { createReducer, on } from '@ngrx/store';
import { CollectionActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Collection, CollectionItem } from '@core/models';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

export interface State<T> extends EntityState<CollectionItem<T>> {
  selectedId: CollectionItem<unknown>['id'] | null;
  isLoading: boolean;
  error?: FirebaseError;
}

export const adapter = <T>(): EntityAdapter<CollectionItem<T>> =>
  createEntityAdapter<CollectionItem<T>>({
    selectId: (collectionItem) => collectionItem.id,
    sortComparer: false
  });

export const initialState: State<unknown> = adapter().getInitialState({
  selectedId: null,
  isLoading: false
});

export const reducer = (collection: Collection) =>
  createReducer(
    initialState,

    on(CollectionActions.loadCollection, (state, action) => {
      if (action.collection === collection) {
        return {
          ...state,
          isLoading: !state.ids.length
        };
      } else {
        return state;
      }
    }),
    on(CollectionActions.loadCollectionSuccess, (state, action) => {
      if (action.collection === collection) {
        return {
          ...adapter().setAll(action.items, state),
          isLoading: !action.collection.length
        };
      } else {
        return state;
      }
    }),
    on(CollectionActions.loadCollectionFailure, (state, action) => {
      if (action.collection === collection) {
        return {
          ...state,
          error: action.error
        };
      } else {
        return state;
      }
    }),
    on(CollectionActions.selectCollectionItem, (state, action) => {
      if (action.collection === collection) {
        return {
          ...state,
          selectedId: action.id
        };
      } else {
        return state;
      }
    })
  );
