import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as CoreActions from '../actions';
import * as CoreSelectors from '../selectors';
import { catchError, exhaustMap, first, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Alerts, CoreConfig } from '@core/models';

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
          return this.afs
            .collection('core')
            .doc<Alerts>(CoreConfig.Alerts)
            .valueChanges()
            .pipe(
              first(),
              map((alerts) => {
                if (!Object.keys(alerts).length) throw new Error('Failed to load alerts.');
                return CoreActions.loadAlertsSuccess({ alerts });
              }),
              catchError((error) =>
                of(CoreActions.loadAlertsFailiure({ error: error.code }), CoreActions.networkError())
              )
            );
        }
      })
    )
  );

  constructor(private actions$: Actions, private store: Store, private afs: AngularFirestore) {}
}
