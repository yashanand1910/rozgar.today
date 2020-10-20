import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as CoreActions from '../actions';
import * as CoreSelectors from '../selectors';
import { catchError, exhaustMap, filter, first, last, map, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { Alerts, CoreConfig } from '@core/models';
import { AngularFireRemoteConfig, budget } from '@angular/fire/remote-config';

@Injectable()
export class AlertEffects {
  loadAlerts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.loadAlerts),
      withLatestFrom(this.store.select(CoreSelectors.selectAlerts)),
      exhaustMap(([, existing]) => {
        if (existing) {
          return of(CoreActions.loadAlertsSuccess({ alerts: existing }));
        } else {
          return this.afr.changes.pipe(
            filter((param) => param.key === CoreConfig.Alerts),
            first(),
            map((str) => JSON.parse(str._value) as Alerts),
            map((alerts) => CoreActions.loadAlertsSuccess({ alerts })),
            catchError((error) => of(CoreActions.loadAlertsFailiure({ error: error.code }), CoreActions.networkError()))
          );
        }
      })
    )
  );

  constructor(private actions$: Actions, private store: Store, private afr: AngularFireRemoteConfig) {}
}
