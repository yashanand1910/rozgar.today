import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap, take, withLatestFrom } from 'rxjs/operators';

import * as OptionActions from '../actions';
import * as OptionSelectors from '../selectors';
import { AngularFirestore } from '@angular/fire/firestore';
import { Option } from '@core/models';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class OptionEffects {
  loadOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OptionActions.loadOption),
      mergeMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.select(OptionSelectors.selectOption, { collection: action.collection }))
        )
      ),
      concatMap(([action, existing]) => {
        if (existing?.options?.length) {
          return of(OptionActions.loadOptionSuccess({ collection: action.collection, options: existing.options }));
        } else {
          return this.afs
            .collection('core')
            .doc('options')
            .collection<Option>(action.collection)
            .valueChanges()
            .pipe(
              take(1),
              map((options) => OptionActions.loadOptionSuccess({ collection: action.collection, options })),
              catchError((error) => of(OptionActions.loadOptionFailed({ error, collection: action.collection })))
            );
        }
      })
    );
  });

  constructor(private actions$: Actions, private afs: AngularFirestore, private store: Store) {}
}
