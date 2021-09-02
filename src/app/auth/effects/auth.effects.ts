import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Auth, authState, signOut } from '@angular/fire/auth';
import * as fromRouter from '@ngrx/router-store';
import { CoreActions } from '@core/actions';
import { AuthActions } from '../actions';
import { AuthSelectors } from '../selectors';
import {
  catchError,
  delay,
  exhaustMap,
  filter,
  first,
  map,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { defer, EMPTY, interval, of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { extract } from '@i18n/services';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QueryParamKey } from '@core/models';
import firebase from 'firebase/compat/app';
import { getSerializableFirebaseError } from '@shared/helper';
import { User } from '@auth/models';
import FirebaseError = firebase.FirebaseError;

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class AuthEffects {
  private logoutDelay = 2000;
  private authReloadInterval = 3500;

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      tap(() => this.messageService.loading(extract('Logging out...'), { nzDuration: 1500 })),
      delay(this.logoutDelay),
      exhaustMap(() =>
        signOut(this.auth)
          .then(() => {
            this.router.navigate(['/auth']).then();
            return AuthActions.logOutSuccess();
          })
          .catch((error: FirebaseError) =>
            AuthActions.logOutFailure({
              error: getSerializableFirebaseError(error)
            })
          )
      )
    )
  );

  ensureLogOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.ensureLogOut),
      exhaustMap(() =>
        authState(this.auth).pipe(
          first(),
          switchMap((user) => {
            if (user) {
              return signOut(this.auth)
                .then(() => {
                  return AuthActions.logOutSuccess();
                })
                .catch((error: FirebaseError) =>
                  AuthActions.logOutFailure({
                    error: getSerializableFirebaseError(error)
                  })
                );
            }
            return EMPTY;
          }),
          catchError((error: FirebaseError) =>
            of(
              AuthActions.loadAuthFailure({
                error: getSerializableFirebaseError(error)
              })
            )
          )
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logOutSuccess),
        withLatestFrom(this.store.select(AuthSelectors.selectUser)),
        map(([, user]) => {
          this.messageService.success(extract(`${user?.displayName} has been logged out.`));
        })
      ),
    { dispatch: false }
  );

  loadAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadAuth),
      exhaustMap(() =>
        authState(this.auth).pipe(
          map((user) => {
            return AuthActions.loadAuthSuccess({
              user: user ? this.sanitizeUser(user) : null
            });
          }),
          catchError((error: FirebaseError) => {
            return of(
              AuthActions.loadAuthFailure({
                error: getSerializableFirebaseError(error)
              }),
              CoreActions.networkError()
            );
          })
        )
      )
    )
  );

  startReloadingAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.startReloadingAuth),
      switchMap(() =>
        interval(this.authReloadInterval).pipe(
          withLatestFrom(authState(this.auth)),
          switchMap(([, user]) =>
            defer(() => user?.reload()).pipe(
              map(() =>
                AuthActions.loadAuthSuccess({
                  user: user ? this.sanitizeUser(user) : null
                })
              )
            )
          ),
          takeUntil(this.actions$.pipe(ofType(AuthActions.stopReloadingAuth)))
        )
      )
    )
  );

  // For firebase auth redirects (e.g. email verification)
  redirectAuthAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromRouter.routerNavigatedAction),
        filter(
          (action) =>
            action.payload.routerState.root.firstChild.routeConfig.path === 'auth' &&
            action.payload.routerState.root.queryParams.mode
        ),
        map((action) => action.payload.routerState.root.queryParams[QueryParamKey.AuthActionMode]),
        map((mode) => {
          switch (mode) {
            case 'resetPassword':
              this.router
                .navigate(['/auth/reset-password'], { queryParamsHandling: 'preserve', skipLocationChange: true })
                .then();
              break;
            case 'verifyEmail':
              this.router
                .navigate(['/auth/verify-email'], { queryParamsHandling: 'preserve', skipLocationChange: true })
                .then();
              break;
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private auth: Auth,
    private messageService: NzMessageService,
    private router: Router
  ) {}

  private sanitizeUser = (user: User) => {
    return {
      uid: user.uid,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber
    };
  };
}
