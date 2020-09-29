import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, takeUntil, filter, take } from 'rxjs/operators';
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
                filter((stopAction) => stopAction.collection === action.collection),
                take(1)
              )
            ),
            map((items) =>
              CoreActions.loadCollectionSuccess({
                collection: action.collection,
                items
              })
            ),
            catchError((error) =>
              of(
                CoreActions.loadCollectionFailure({ error: error.code, collection: action.collection }),
                CoreActions.networkError()
              )
            )
          )
      )
    );
  });

  constructor(private actions$: Actions, private afs: AngularFirestore) {}
}
