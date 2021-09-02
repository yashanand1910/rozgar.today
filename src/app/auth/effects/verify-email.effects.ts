import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterSelectors } from '@core/selectors';
import { JoinActions } from '@app/join/actions';
import { catchError, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { defer, of } from 'rxjs';
import { VerifyEmailActions } from '../actions';
import { Store } from '@ngrx/store';
import { applyActionCode, Auth, checkActionCode } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import { getSerializableFirebaseError } from '@shared/helper';
import FirebaseError = firebase.FirebaseError;

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class VerifyEmailEffects {
  verifyEmailCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VerifyEmailActions.verifyEmailCode),
      withLatestFrom(this.store.select(RouterSelectors.selectQueryParam('oobCode'))),
      switchMap(([, code]) =>
        defer(() => checkActionCode(this.auth, code)).pipe(
          map((metaData) => metaData.data.email),
          switchMap((email) => [
            VerifyEmailActions.verifyEmailCodeSuccess({ user: { email }, code }),
            VerifyEmailActions.verifyEmail({ code })
          ]),
          catchError((error: FirebaseError) =>
            of(
              VerifyEmailActions.verifyEmailCodeFailure({
                error: getSerializableFirebaseError(error)
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
        defer(() => applyActionCode(this.auth, code)).pipe(
          switchMap(() => [VerifyEmailActions.verifyEmailSuccess(), JoinActions.refreshSteps()]),
          catchError((error: FirebaseError) =>
            of(
              VerifyEmailActions.verifyEmailCodeFailure({
                error: getSerializableFirebaseError(error)
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private store: Store, private auth: Auth) {}
}
