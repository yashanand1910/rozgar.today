import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AlertActions, CoreActions } from '../actions';
import { AlertSelectors } from '../selectors';
import { catchError, exhaustMap, filter, first, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Alerts, CoreConfig } from '@core/models';
import { AngularFireRemoteConfig } from '@angular/fire/remote-config';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;
import { getSerializableFirebaseError } from '@shared/helper';

@Injectable()
export class AlertEffects {
  loadAlerts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlertActions.loadAlerts),
      withLatestFrom(this.store.select(AlertSelectors.selectAll)),
      exhaustMap(([, existing]) => {
        if (existing) {
          return of(AlertActions.loadAlertsSuccess({ alerts: existing }));
        } else {
          return this.afr.changes.pipe(
            filter((param) => param.key === CoreConfig.Alerts),
            first(),
            map((str) => JSON.parse(str._value) as Alerts),
            map((alerts) => AlertActions.loadAlertsSuccess({ alerts })),
            catchError((error: FirebaseError) =>
              of(
                AlertActions.loadAlertsFailure({
                  error: getSerializableFirebaseError(error)
                }),
                CoreActions.networkError()
              )
            )
          );
        }
      })
    )
  );

  constructor(private actions$: Actions, private store: Store, private afr: AngularFireRemoteConfig) {}
}
