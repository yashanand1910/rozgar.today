import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromRoot from '@core/reducers';

import { catchError, exhaustMap, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { from, of } from 'rxjs';

import * as VerifyEmailActions from '../actions/verify-email.actions';
import { select, Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class VerifyEmailEffects {
  verifyEmailCode = createEffect(() =>
    this.actions$.pipe(
      ofType(VerifyEmailActions.verifyEmailCode),
      exhaustMap((action) => this.store.pipe(take(1), select(fromRoot.selectQueryParam('oobCode')))),
      switchMap((code) =>
        from(this.afa.checkActionCode(code)).pipe(
          map((metaData) => metaData.data.email),
          switchMap((email) => [
            VerifyEmailActions.verifyEmailCodeSuccess({ user: { email }, code }),
            VerifyEmailActions.verifyEmail({ code })
          ]),
          catchError((error) => of(VerifyEmailActions.verifyEmailCodeFailed({ error })))
        )
      )
    )
  );

  verifyEmail = createEffect(() =>
    this.actions$.pipe(
      ofType(VerifyEmailActions.verifyEmail),
      map((action) => action.code),
      exhaustMap((code) =>
        from(this.afa.applyActionCode(code)).pipe(
          map(() => VerifyEmailActions.verifyEmailSuccess()),
          catchError((error) => of(VerifyEmailActions.verifyEmailCodeFailed({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private store: Store<fromRoot.State>, private afa: AngularFireAuth) {}
}
