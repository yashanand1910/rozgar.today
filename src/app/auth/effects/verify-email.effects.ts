import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterSelectors } from '@core/selectors';
import { JoinActions } from '@app/join/actions';
import { catchError, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { VerifyEmailActions } from '../actions';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

@Injectable()
export class VerifyEmailEffects {
  verifyEmailCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerifyEmailActions.verifyEmailCode),
      withLatestFrom(this.store.select(RouterSelectors.selectQueryParam('oobCode'))),
      switchMap(([, code]) =>
        from(this.afa.checkActionCode(code)).pipe(
          map((metaData) => metaData.data.email),
          switchMap((email) => [
            VerifyEmailActions.verifyEmailCodeSuccess({ user: { email }, code }),
            VerifyEmailActions.verifyEmail({ code })
          ]),
          catchError((error: FirebaseError) =>
            of(
              VerifyEmailActions.verifyEmailCodeFailiure({
                error: { code: error.code, message: error.message, name: error.name, stack: error.stack }
              })
            )
          )
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
          catchError((error: FirebaseError) =>
            of(
              VerifyEmailActions.verifyEmailCodeFailiure({
                error: { code: error.code, message: error.message, name: error.name, stack: error.stack }
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private store: Store, private afa: AngularFireAuth) {}
}
