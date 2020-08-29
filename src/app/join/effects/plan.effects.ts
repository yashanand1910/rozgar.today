import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, take } from 'rxjs/operators';
import { of } from 'rxjs';

import * as PlanActions from '@app/join/actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseCollection, Plan } from '@app/join/models';

@Injectable()
export class PlanEffects {
  loadPlans$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlanActions.loadPlans),
      exhaustMap(() =>
        this.afs
          .collection<Plan>(FirebaseCollection.Plans)
          .valueChanges({ idField: 'id' })
          .pipe(
            take(1),
            map((plans) => PlanActions.loadPlansSuccess({ plans })),
            catchError((error) => of(PlanActions.loadPlansFailure({ error })))
          )
      )
    );
  });

  constructor(private actions$: Actions, private afs: AngularFirestore) {}
}
