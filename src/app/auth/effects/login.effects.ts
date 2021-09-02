import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterSelectors } from '@core/selectors';
import { AuthActions, LoginActions } from '../actions';
import { catchError, exhaustMap, first, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Auth, setPersistence, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { extract } from '@i18n/services';
import { Store } from '@ngrx/store';
import { QueryParamKey } from '@core/models';
import { defer, of } from 'rxjs';
import { getSerializableFirebaseError } from '@shared/helper';
import firebase from 'firebase/compat/app';
import FirebaseError = firebase.FirebaseError;

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class LoginEffects {
  logIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.logIn),
      map((action) => action.context),
      withLatestFrom(this.store.select(RouterSelectors.selectQueryParam(QueryParamKey.ReturnUrl))),
      exhaustMap(([context, url]) => {
        setPersistence(this.auth, {
          type: context.remember ? 'LOCAL' : 'SESSION'
        }).then();
        return defer(() => signInWithEmailAndPassword(this.auth, context.email, context.password)).pipe(
          // Required so that resolvers do not get resolved before the user is loaded
          switchMap(() => this.actions$.pipe(ofType(AuthActions.loadAuthSuccess), first())),
          map((action) => {
            this.messageService.loading(extract(`${action.user.displayName} logged in. Just a moment...`));
            if (url) {
              this.router.navigateByUrl(url, { replaceUrl: true }).then();
            } else {
              this.router.navigate(['']).then();
            }
            return LoginActions.logInSuccess();
          }),
          catchError((error: FirebaseError) =>
            of(
              LoginActions.logInFailure({
                error: getSerializableFirebaseError(error)
              })
            )
          )
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private auth: Auth,
    private router: Router,
    private messageService: NzMessageService,
    private store: Store
  ) {}
}
