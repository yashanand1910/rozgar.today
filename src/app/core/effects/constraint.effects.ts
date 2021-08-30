import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, first, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConstraintActions, CoreActions } from '../actions';
import { ConstraintSelectors } from '../selectors';
import { Constraints, CoreConfig } from '@core/models';
import { Store } from '@ngrx/store';
import { AngularFireRemoteConfig } from '@angular/fire/remote-config';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;
import { getSerializableFirebaseError } from '@shared/helper';

@Injectable()
export class ConstraintEffects {
  loadConstraints$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConstraintActions.loadConstraints),
      withLatestFrom(this.store.select(ConstraintSelectors.selectAll)),
      exhaustMap(([, existing]) => {
        if (existing) {
          return of(ConstraintActions.loadConstraintsSuccess({ constraints: existing }));
        } else {
          return this.afr.changes.pipe(
            filter((param) => param.key === CoreConfig.Constraints),
            first(),
            map((str) => JSON.parse(str._value) as Constraints),
            map((constraints) => {
              return ConstraintActions.loadConstraintsSuccess({ constraints });
            }),
            catchError((error: FirebaseError) =>
              of(
                ConstraintActions.loadConstraintsFailure({
                  error: getSerializableFirebaseError(error)
                }),
                CoreActions.networkError()
              )
            )
          );
        }
      })
    );
  });

  constructor(private actions$: Actions, private store: Store, private afr: AngularFireRemoteConfig) {}
}
