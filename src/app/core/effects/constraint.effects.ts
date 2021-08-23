import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, first, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CoreActions from '../actions';
import * as ConstraintSelectors from '../selectors/constraint.selectors';
import { Constraints, CoreConfig } from '@core/models';
import { Store } from '@ngrx/store';
import { AngularFireRemoteConfig } from '@angular/fire/remote-config';
import firebase from 'firebase';
import FirebaseError = firebase.FirebaseError;

@Injectable()
export class ConstraintEffects {
  loadConstraints$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoreActions.loadConstraints),
      withLatestFrom(this.store.select(ConstraintSelectors.selectAll)),
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
            catchError((error: FirebaseError) =>
              of(CoreActions.loadConstraintsFailure({ error: error.code }), CoreActions.networkError())
            )
          );
        }
      })
    );
  });

  constructor(private actions$: Actions, private store: Store, private afr: AngularFireRemoteConfig) {}
}
