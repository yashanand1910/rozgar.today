import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, take } from 'rxjs/operators';
import { of } from 'rxjs';

import * as JoinActions from '@app/join/actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseCollection, Plan } from '@app/join/models';

@Injectable()
export class PlanEffects {
  loadPlans$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JoinActions.loadPlans),
      exhaustMap(() =>
        this.afs
          .collection<Plan>(FirebaseCollection.Plans)
          .valueChanges({ idField: 'id' })
          .pipe(
            take(1),
            map((plans) => JoinActions.loadPlansSuccess({ plans })),
            catchError((error) => of(JoinActions.loadPlansFailure({ error })))
          )
      )
    )
  );

  constructor(private actions$: Actions, private afs: AngularFirestore) {}
}
