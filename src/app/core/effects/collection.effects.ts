import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, first, map, take, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';

import { CollectionActions, CoreActions } from '../actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { CollectionItem } from '@core/models';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

@Injectable()
export class CollectionEffects {
  loadCollections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionActions.loadCollection),
      exhaustMap((action) =>
        this.afs
          .collection<CollectionItem<unknown>>(action.collection)
          .valueChanges({ idField: 'id' })
          .pipe(
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
                  error: { code: error.code, name: error.name, message: error.message, stack: error.stack },
                  collection: action.collection
                }),
                CoreActions.networkError()
              )
            )
          )
      )
    );
  });

  constructor(private actions$: Actions, private afs: AngularFirestore) {}
}
