import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CoreSelectors from '@core/selectors/core.selector';
import * as JoinActions from '@app/join/actions';
import { catchError, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { from, of } from 'rxjs';
import * as VerifyEmailActions from '../actions/verify-email.actions';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class VerifyEmailEffects {
  verifyEmailCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerifyEmailActions.verifyEmailCode),
      withLatestFrom(this.store.select(CoreSelectors.selectQueryParam('oobCode'))),
      switchMap(([, code]) =>
        from(this.afa.checkActionCode(code)).pipe(
          map((metaData) => metaData.data.email),
          switchMap((email) => [
            VerifyEmailActions.verifyEmailCodeSuccess({ user: { email }, code }),
            VerifyEmailActions.verifyEmail({ code })
          ]),
          catchError((error) => of(VerifyEmailActions.verifyEmailCodeFailiure({ error: error.code })))
        )
      )
    )
  );

  verifyEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerifyEmailActions.verifyEmail),
      map((action) => action.code),
      exhaustMap((code) =>
        from(this.afa.applyActionCode(code)).pipe(
          switchMap(() => [VerifyEmailActions.verifyEmailSuccess(), JoinActions.refreshSteps()]),
          catchError((error) => of(VerifyEmailActions.verifyEmailCodeFailiure({ error: error.code })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private store: Store, private afa: AngularFireAuth) {}
}
