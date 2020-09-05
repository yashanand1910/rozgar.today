import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, take } from 'rxjs/operators';
import { of } from 'rxjs';

import * as JoinActions from '@app/join/actions';
import * as CoreActions from '@core/actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { NzMessageService } from 'ng-zorro-antd';
import { FirestoreCollection, Plan } from '@app/join/models';

@Injectable()
export class PlanEffects {
  loadPlans$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(JoinActions.loadPlans),
        exhaustMap(() =>
          this.afs
            .collection<Plan>(FirestoreCollection.Plans)
            .valueChanges({ idField: 'id' })
            .pipe(
              take(1),
              map((plans) => {
                if (!plans.length) {
                  throw new Error('Failed to load plans.');
                } else {
                  return JoinActions.loadPlansSuccess({ plans });
                }
              }),
              catchError((error: Error) => {
                return of(JoinActions.loadPlansFailure({ error }), CoreActions.networkError());
              })
            )
        )
      ),
    { useEffectsErrorHandler: true }
  );

  constructor(private actions$: Actions, private afs: AngularFirestore, private messageService: NzMessageService) {}
}
