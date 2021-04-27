import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CoreSelectors from '@core/selectors';
import * as AuthActions from '../actions';
import { catchError, exhaustMap, first, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { extract } from '@i18n/services';
import { Store } from '@ngrx/store';
import { QueryParamKey } from '@core/models';
import { from, of } from 'rxjs';
import firebase from 'firebase/app';
import Persistence = firebase.auth.Auth.Persistence;

@Injectable()
export class LoginEffects {
  logIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logIn),
      map((action) => action.context),
      withLatestFrom(this.store.select(CoreSelectors.selectQueryParam(QueryParamKey.ReturnUrl))),
      exhaustMap(([context, url]) => {
        this.afa.setPersistence(context.remember ? Persistence.LOCAL : Persistence.LOCAL).then();
        return from(this.afa.signInWithEmailAndPassword(context.email, context.password)).pipe(
          // Required so that resolvers do not get resolved before the user is loaded
          switchMap(() => this.actions$.pipe(ofType(AuthActions.loadAuthSuccess), first())),
          map((action) => {
            this.messageService.loading(extract(`${action.user.displayName} logged in. Just a moment...`));
            if (url) {
              this.router.navigateByUrl(url, { replaceUrl: true }).then();
            } else {
              this.router.navigate(['']).then();
            }
            return AuthActions.logInSuccess();
          }),
          catchError((error) => of(AuthActions.logInFailiure({ error: error.code })))
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private afa: AngularFireAuth,
    private router: Router,
    private messageService: NzMessageService,
    private store: Store
  ) {}
}
