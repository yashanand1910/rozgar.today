import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as JoinActions from '../actions';
import * as fromJoin from '../reducers';
import { exhaustMap, map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';

export * from './plan.effects';

@Injectable()
export class JoinEffects {
  loadPlans$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(JoinActions.nextStep),
        exhaustMap(() =>
          this.store.pipe(select(fromJoin.selectNextStepPath)).pipe(
            take(1),
            map((path) => this.router.navigate([`/join/${path}`]).then())
          )
        )
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private store: Store<fromJoin.State>, private router: Router) {}
}
