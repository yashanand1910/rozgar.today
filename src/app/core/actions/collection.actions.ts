import { createAction, props } from '@ngrx/store';
import { Collection, CollectionItem } from '@core/models/collection';
import firebase from 'firebase/compat/app';
import FirebaseError = firebase.FirebaseError;

export const loadCollection = createAction(
  '[Collection] Load Collection',
  props<{ collection: Collection; live?: boolean }>()
);

export const loadCollectionSuccess = createAction(
  '[Collection] Load Collection Success',
  props<{ items: CollectionItem<unknown>[]; collection: Collection }>()
);

export const loadCollectionFailure = createAction(
  '[Collection] Load Collection Failure',
  props<{ error: FirebaseError; collection: Collection }>()
);

export const stopLoadCollection = createAction(
  '[Collection] Stop Load Collection',
  props<{ collection: Collection }>()
);

export const selectCollectionItem = createAction(
  '[Collection] Select Collection Item',
  props<{ collection: Collection; id: string }>()
);
