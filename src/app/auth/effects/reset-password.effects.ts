import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromRoot from '@core/reducers';
import * as ResetPasswordActions from '../actions';
import * as ResetPasswordSelectors from '../selectors';
import { AngularFireAuth } from '@angular/fire/auth';
import { select, Store } from '@ngrx/store';
import { catchError, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { extract } from '@i18n/services';
import { Router } from '@angular/router';

@Injectable()
export class ResetPasswordEffects {
  verifyCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResetPasswordActions.verifyResetPasswordCode),
      switchMap((action) =>
        of(action).pipe(withLatestFrom(this.store.pipe(select(fromRoot.selectQueryParam('oobCode')))))
      ),
      exhaustMap(([, code]) =>
        from(this.afa.verifyPasswordResetCode(code)).pipe(
          map((email) => ResetPasswordActions.verifyResetPasswordCodeSuccess({ user: { email }, code })),
          catchError((error) => of(ResetPasswordActions.verifyResetPasswordCodeFailed({ error })))
        )
      )
    );
  });

  resetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResetPasswordActions.resetPassword),
      exhaustMap((action) =>
        of(action).pipe(withLatestFrom(this.store.pipe(select(ResetPasswordSelectors.selectResetPasswordCode))))
      ),
      switchMap(([action, code]) =>
        from(this.afa.confirmPasswordReset(code, action.context.password)).pipe(
          map(() => {
            this.messageService.success(
              extract('Password was successfully reset. You can login with your new password.')
            );
            this.router.navigate(['/auth']).then();
            return ResetPasswordActions.resetPasswordSuccess();
          }),
          catchError((error) => of(ResetPasswordActions.resetPasswordFailed({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private afa: AngularFireAuth,
    private store: Store<fromRoot.State>,
    private messageService: NzMessageService,
    private router: Router
  ) {}
}
