import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, take, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import * as JoinActions from '@app/join/actions';
import * as JoinSelectors from '@app/join/selectors';
import * as CoreActions from '@core/actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCollection, Plan } from '@app/join/models';
import { Store } from '@ngrx/store';

@Injectable()
export class PlanEffects {
  loadPlans$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(JoinActions.loadPlans),
        withLatestFrom(this.store.select(JoinSelectors.selectAllPlans)),
        exhaustMap(([action, plans]) => {
          if (plans.length) {
            return of(JoinActions.loadPlansSuccess({ plans }));
          } else {
            return this.afs
              .collection<Plan>(FirestoreCollection.Plans)
              .valueChanges({ idField: 'id' })
              .pipe(
                take(1),
                map((newPlans) => {
                  if (!newPlans.length) {
                    throw new Error('Failed to load plans.');
                  } else {
                    return JoinActions.loadPlansSuccess({ plans: newPlans });
                  }
                }),
                catchError((error: Error) => {
                  return of(JoinActions.loadPlansFailure({ error }), CoreActions.networkError());
                })
              );
          }
        })
      ),
    { useEffectsErrorHandler: true }
  );

  constructor(private actions$: Actions, private afs: AngularFirestore, private store: Store) {}
}
