import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as JoinActions from '../actions';
import * as JoinSelectors from '../selectors';
import { tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

export * from './plan.effects';

@Injectable()
export class JoinEffects {
  nextJoinStep$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(JoinActions.nextJoinStep),
        withLatestFrom(this.store.select(JoinSelectors.selectJoinNextStepPath)),
        tap(([, path]) => this.router.navigate([`/join/${path}`]).then())
      );
    },
    { dispatch: false }
  );

  previousJoinStep$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(JoinActions.previousJoinStep),
        withLatestFrom(this.store.select(JoinSelectors.selectJoinPreviousStepPath)),
        tap(([, path]) => this.router.navigate([`/join/${path}`]).then())
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private store: Store, private router: Router) {}
}
