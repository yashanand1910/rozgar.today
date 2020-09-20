import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as CoreActions from '../actions';
import * as CoreSelectors from '../selectors';
import { catchError, exhaustMap, map, take, withLatestFrom } from 'rxjs/operators';
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
              take(1),
              map((alerts) => {
                if (!Object.keys(alerts).length) throw new Error('Failed to load alerts.');
                return CoreActions.loadAlertsSuccess({ alerts });
              }),
              catchError((error: Error) =>
                of(CoreActions.loadAlertsFailiure({ error: error.message }), CoreActions.networkError())
              )
            );
        }
      })
    )
  );

  constructor(private actions$: Actions, private store: Store, private afs: AngularFirestore) {}
}
