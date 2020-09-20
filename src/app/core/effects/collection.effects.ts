import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, takeUntil, filter } from 'rxjs/operators';
import { of } from 'rxjs';

import * as CoreActions from '../actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { CollectionItem, Collection } from '@core/models';

@Injectable()
export class CollectionEffects {
  loadCollections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoreActions.loadCollection),
      concatMap((action) =>
        this.afs
          .collection<CollectionItem<unknown>>(action.collection)
          .valueChanges({ idField: 'id' })
          .pipe(
            takeUntil(
              this.actions$.pipe(
                ofType(CoreActions.stopLoadCollection),
                filter((stopAction) => stopAction.collection === action.collection)
              )
            ),
            map((items) =>
              CoreActions.loadCollectionSuccess({
                collection: action.collection,
                items
              })
            ),
            catchError((error: Error) =>
              of(
                CoreActions.loadCollectionFailure({ error: error.message, collection: action.collection }),
                CoreActions.networkError()
              )
            )
          )
      )
    );
  });

  constructor(private actions$: Actions, private afs: AngularFirestore) {}
}
