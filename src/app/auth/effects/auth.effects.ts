import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';
import * as fromRouter from '@ngrx/router-store';
import * as CoreActions from '@core/actions';
import * as AuthActions from '../actions';
import * as JoinActions from '@app/join/actions';
import * as AuthSelectors from '../selectors';
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
import { EMPTY, from, interval, of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { extract } from '@i18n/services';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QueryParamKey } from '@core/models';
import firebase from 'firebase/app';
import User = firebase.User;
import FirebaseError = firebase.FirebaseError;

@Injectable()
export class AuthEffects {
  private logoutDelay = 2000;
  private authReloadInterval = 3500;

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      tap(() => this.messageService.loading(extract('Logging out...'), { nzDuration: 1500 })),
      delay(this.logoutDelay),
      exhaustMap(() => {
        return this.afa
          .signOut()
          .then(() => {
            this.router.navigate(['/auth']).then();
            return AuthActions.logOutSuccess();
          })
          .catch((error: FirebaseError) => AuthActions.logOutFailiure({ error: error.code }));
      })
    )
  );

  ensureLogOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.ensureLogOut),
      exhaustMap(() => {
        return this.afa.authState.pipe(
          first(),
          switchMap((user) => {
            if (user) {
              return this.afa
                .signOut()
                .then(() => {
                  return AuthActions.logOutSuccess();
                })
                .catch((error: FirebaseError) => AuthActions.logOutFailiure({ error: error.code }));
            }
            return EMPTY;
          }),
          catchError((error: FirebaseError) => of(AuthActions.loadAuthFailiure({ error: error.code })))
        );
      })
    )
  );

  logoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOutSuccess),
      withLatestFrom(this.store.select(AuthSelectors.selectUser)),
      exhaustMap(([, user]) => {
        this.messageService.success(extract(`${user?.displayName} has been logged out.`));

        // Add all state resets below
        return [JoinActions.resetState()];
      })
    )
  );

  loadAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadAuth),
      exhaustMap(() => {
        return this.afa.authState.pipe(
          map((user) => {
            return AuthActions.loadAuthSuccess({
              user: user ? this.sanitizeUser(user) : null
            });
          }),
          catchError((error: FirebaseError) => {
            return of(AuthActions.loadAuthFailiure({ error: error.code }), CoreActions.networkError());
          })
        );
      })
    )
  );

  loadAuthSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadAuthSuccess),
      switchMap((action) => {
        return of(CoreActions.getFirestoreState());
        // if (action.user) {
        //   return of(CoreActions.getFirestoreState());
        // } else {
        //   return EMPTY;
        // }
      })
    )
  );

  startReloadingAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.startReloadingAuth),
      switchMap(() =>
        this.afa.authState.pipe(
          switchMap((user) =>
            interval(this.authReloadInterval).pipe(
              takeUntil(this.actions$.pipe(ofType(AuthActions.stopReloadingAuth))),
              switchMap(() => from(user.reload())),
              map(() =>
                AuthActions.loadAuthSuccess({
                  user: user ? this.sanitizeUser(user) : null
                })
              )
            )
          ),
          catchError((error: FirebaseError) => of(AuthActions.loadAuthFailiure({ error: error.code })))
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
    private afa: AngularFireAuth,
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
