import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as LoginActions from '../actions/login.actions';
import { exhaustMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginEffects {
  logIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.logIn),
      map((action) => action.loginContext),
      exhaustMap((context) => {
        return Promise.all([
          this.afa.setPersistence(
            context.remember ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION
          ),
          this.afa.signInWithEmailAndPassword(context.email, context.password),
        ])
          .then(([output, userCredential]) => {
            this.messageService.success(`${userCredential.user.displayName} logged in.`);
            this.router.navigate(['']).then();
            return LoginActions.logInSuccess();
          })
          .catch((error) => LoginActions.logInFailed({ error }));
      })
    );
  });

  constructor(
    private actions$: Actions,
    private afa: AngularFireAuth,
    private router: Router,
    private messageService: NzMessageService
  ) {}
}
