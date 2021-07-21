import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, first, last, map, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import * as CoreActions from '../actions';
import * as CoreSelectors from '../selectors';
import { Constraints, CoreConfig } from '@core/models';
import { Store } from '@ngrx/store';
import { AngularFireRemoteConfig, budget } from '@angular/fire/remote-config';

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
          return this.afr.changes.pipe(
            filter((param) => param.key === CoreConfig.Constraints),
            first(),
            map((str) => JSON.parse(str._value) as Constraints),
            map((constraints) => {
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

  constructor(private actions$: Actions, private store: Store, private afr: AngularFireRemoteConfig) {}
}
