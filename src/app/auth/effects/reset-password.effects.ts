import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RouterSelectors from '@core/selectors/router.selectors';
import * as ResetPasswordActions from '../actions';
import * as ResetPasswordSelectors from '../selectors/reset-password.selectors';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { extract } from '@i18n/services';
import { Router } from '@angular/router';
import firebase from 'firebase';
import FirebaseError = firebase.FirebaseError;

@Injectable()
export class ResetPasswordEffects {
  verifyCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResetPasswordActions.verifyResetPasswordCode),
      withLatestFrom(this.store.select(RouterSelectors.selectQueryParam('oobCode'))),
      exhaustMap(([, code]) =>
        from(this.afa.verifyPasswordResetCode(code)).pipe(
          map((email) => ResetPasswordActions.verifyResetPasswordCodeSuccess({ user: { email }, code })),
          catchError((error: FirebaseError) =>
            of(ResetPasswordActions.verifyResetPasswordCodeFailiure({ error: error.code }))
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
        from(this.afa.confirmPasswordReset(code, action.context.password)).pipe(
          map(() => {
            this.messageService.success(
              extract('Password was successfully reset. You can login with your new password.')
            );
            this.router.navigate(['/auth']).then();
            return ResetPasswordActions.resetPasswordSuccess();
          }),
          catchError((error: FirebaseError) => of(ResetPasswordActions.resetPasswordFailiure({ error: error.code })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private afa: AngularFireAuth,
    private store: Store,
    private messageService: NzMessageService,
    private router: Router
  ) {}
}
