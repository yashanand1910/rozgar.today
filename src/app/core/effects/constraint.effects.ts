import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, first, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConstraintActions, CoreActions } from '../actions';
import { ConstraintSelectors } from '../selectors';
import { Constraints, CoreConfig } from '@core/models';
import { Store } from '@ngrx/store';
import { getStringChanges, RemoteConfig } from '@angular/fire/remote-config';
import firebase from 'firebase/compat/app';
import { getSerializableFirebaseError } from '@shared/helper';
import FirebaseError = firebase.FirebaseError;

// noinspection JSUnusedGlobalSymbols
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
          return getStringChanges(this.remoteConfig, CoreConfig.Constraints).pipe(
            first(),
            map((str) => JSON.parse(str) as Constraints),
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

  constructor(private actions$: Actions, private store: Store, private remoteConfig: RemoteConfig) {}
}
