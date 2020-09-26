import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, withLatestFrom, take } from 'rxjs/operators';
import { of } from 'rxjs';

import * as CoreActions from '../actions';
import * as CoreSelectors from '../selectors';
import { AngularFirestore } from '@angular/fire/firestore';
import { Constraints } from '@core/models';
import { CoreConfig } from '@core/models';
import { Store } from '@ngrx/store';

@Injectable()
export class ConstraintEffects {
  loadConstraints$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoreActions.loadConstraints),
      withLatestFrom(this.store.select(CoreSelectors.selectConstraints)),
      exhaustMap(([, existing]) => {
        if (existing) {
          return of(CoreActions.loadConstraintsSuccess({ constraints: existing }));
        } else {
          return this.afs
            .collection('core')
            .doc<Constraints>(CoreConfig.Constraints)
            .valueChanges()
            .pipe(
              take(1),
              map((constraints) => {
                if (!Object.keys(constraints).length) throw new Error(`Failed to load constraints.`);
                return CoreActions.loadConstraintsSuccess({ constraints });
              }),
              catchError((error) =>
                of(CoreActions.loadConstraintsFailure({ error: error.code }), CoreActions.networkError())
              )
            );
        }
      })
    );
  });

  constructor(private actions$: Actions, private afs: AngularFirestore, private store: Store) {}
}
