import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';
import * as AuthActions from '../actions';
import { catchError, delay, exhaustMap, map, switchMap, take, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { extract } from '@i18n/services';

@Injectable()
export class AuthEffects {
  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      tap(() => this.messageService.loading(extract('Logging out...'), { nzDuration: 2000 })),
      delay(2000),
      switchMap(() => {
        return this.afa
          .signOut()
          .then(() => AuthActions.logOutSuccess())
          .catch((error) => AuthActions.logOutFailed(error));
      })
    )
  );

  ensureLogOut = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.ensureLogOut),
      exhaustMap((action) => this.afa.user.pipe(take(1))),
      switchMap((user) => {
        if (user) {
          return this.afa
            .signOut()
            .then(() => {
              this.messageService.success(extract(`${user.displayName} has been logged out.`));
              return AuthActions.logOutSuccess();
            })
            .catch((error) => AuthActions.logOutFailed(error));
        }
        return EMPTY;
      })
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(() =>
        this.afa.user.pipe(
          map((user) =>
            AuthActions.getUserSuccess({
              user: user
                ? {
                    uid: user.uid,
                    emailVerified: user.emailVerified,
                    displayName: user.displayName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                  }
                : null,
            })
          ),
          catchError((error) => {
            return of(AuthActions.getUserFailed(error));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private afa: AngularFireAuth, private messageService: NzMessageService) {}
}