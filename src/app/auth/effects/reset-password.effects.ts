import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterSelectors } from '@core/selectors';
import { ResetPasswordSelectors } from '../selectors';
import { ResetPasswordActions } from '../actions';
import { Auth, confirmPasswordReset, verifyPasswordResetCode } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { defer, of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { extract } from '@i18n/services';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { getSerializableFirebaseError } from '@shared/helper';
import FirebaseError = firebase.FirebaseError;

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class ResetPasswordEffects {
  verifyCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResetPasswordActions.verifyResetPasswordCode),
      withLatestFrom(this.store.select(RouterSelectors.selectQueryParam('oobCode'))),
      exhaustMap(([, code]) =>
        defer(() => verifyPasswordResetCode(this.auth, code)).pipe(
          map((email) => ResetPasswordActions.verifyResetPasswordCodeSuccess({ user: { email }, code })),
          catchError((error: FirebaseError) =>
            of(
              ResetPasswordActions.verifyResetPasswordCodeFailure({
                error: getSerializableFirebaseError(error)
              })
            )
          )
        )
      )
    );
  });

  resetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResetPasswordActions.resetPassword),
      withLatestFrom(this.store.select(ResetPasswordSelectors.selectCode)),
      switchMap(([action, code]) =>
        defer(() => confirmPasswordReset(this.auth, code, action.context.password)).pipe(
          map(() => {
            this.messageService.success(
              extract('Password was successfully reset. You can login with your new password.')
            );
            this.router.navigate(['/auth']).then();
            return ResetPasswordActions.resetPasswordSuccess();
          }),
          catchError((error: FirebaseError) =>
            of(
              ResetPasswordActions.resetPasswordFailure({
                error: getSerializableFirebaseError(error)
              })
            )
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private auth: Auth,
    private store: Store,
    private messageService: NzMessageService,
    private router: Router
  ) {}
}
