import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, first, map, take, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { CollectionActions, CoreActions } from '../actions';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { CollectionItem } from '@core/models';
import firebase from 'firebase/compat/app';
import { getSerializableFirebaseError } from '@shared/helper';
import FirebaseError = firebase.FirebaseError;

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class CollectionEffects {
  loadCollections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionActions.loadCollection),
      exhaustMap((action) =>
        collectionData<CollectionItem<any>>(collection(this.firestore, action.collection), { idField: 'id' }).pipe(
          take(action.live ? Infinity : 1),
          takeUntil(
            this.actions$.pipe(
              ofType(CollectionActions.stopLoadCollection),
              filter((stopAction) => stopAction.collection === action.collection),
              first()
            )
          ),
          map((items) =>
            CollectionActions.loadCollectionSuccess({
              collection: action.collection,
              items
            })
          ),
          catchError((error: FirebaseError) =>
            of(
              CollectionActions.loadCollectionFailure({
                error: getSerializableFirebaseError(error),
                collection: action.collection
              }),
              CoreActions.networkError()
            )
          )
        )
      )
    );
  });

  constructor(private actions$: Actions, private firestore: Firestore) {}
}
