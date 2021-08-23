import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as CoreActions from '../actions';
import * as AlertSelectors from '../selectors/alert.selectors';
import { catchError, exhaustMap, filter, first, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Alerts, CoreConfig } from '@core/models';
import { AngularFireRemoteConfig } from '@angular/fire/remote-config';
import firebase from 'firebase';
import FirebaseError = firebase.FirebaseError;

@Injectable()
export class AlertEffects {
  loadAlerts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.loadAlerts),
      withLatestFrom(this.store.select(AlertSelectors.selectAll)),
      exhaustMap(([, existing]) => {
        if (existing) {
          return of(CoreActions.loadAlertsSuccess({ alerts: existing }));
        } else {
          return this.afr.changes.pipe(
            filter((param) => param.key === CoreConfig.Alerts),
            first(),
            map((str) => JSON.parse(str._value) as Alerts),
            map((alerts) => CoreActions.loadAlertsSuccess({ alerts })),
            catchError((error: FirebaseError) =>
              of(CoreActions.loadAlertsFailiure({ error: error.code }), CoreActions.networkError())
            )
          );
        }
      })
    )
  );

  constructor(private actions$: Actions, private store: Store, private afr: AngularFireRemoteConfig) {}
}
