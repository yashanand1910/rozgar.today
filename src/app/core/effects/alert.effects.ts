import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertActions, CoreActions } from '../actions';
import { AlertSelectors } from '../selectors';
import { catchError, exhaustMap, first, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Alerts, CoreConfig } from '@core/models';
import { getStringChanges, RemoteConfig } from '@angular/fire/remote-config';
import { getSerializableFirebaseError } from '@shared/helper';
import firebase from 'firebase/compat/app';
import FirebaseError = firebase.FirebaseError;

// noinspection JSUnusedGlobalSymbols
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
          return getStringChanges(this.remoteConfig, CoreConfig.Alerts).pipe(
            first(),
            map((str) => JSON.parse(str) as Alerts),
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

  constructor(private actions$: Actions, private store: Store, private remoteConfig: RemoteConfig) {}
}
