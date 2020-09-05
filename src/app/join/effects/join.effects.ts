import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromJoin from '../reducers';
import * as JoinActions from '../actions';
import * as JoinSelectors from '../selectors';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';

export * from './plan.effects';

@Injectable()
export class JoinEffects {
  nextStep$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(JoinActions.nextStep),
        exhaustMap(() =>
          this.store.pipe(
            select(JoinSelectors.selectNextStepPath),
            take(1),
            tap((path) => this.router.navigate([`/join/${path}`]).then())
          )
        )
      );
    },
    { dispatch: false }
  );

  previousStep$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(JoinActions.previousStep),
        exhaustMap(() =>
          this.store.pipe(
            select(JoinSelectors.selectPreviousStepPath),
            take(1),
            tap((path) => this.router.navigate([`/join/${path}`]).then())
          )
        )
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private store: Store<fromJoin.State>, private router: Router) {}
}
