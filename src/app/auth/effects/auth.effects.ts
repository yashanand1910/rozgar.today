import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';
import * as AuthActions from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      switchMap(() =>
        this.afa
          .signOut()
          .then(() => AuthActions.logOutSuccess())
          .catch((error) => AuthActions.logOutFailed(error))
      )
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

  constructor(private actions$: Actions, private afa: AngularFireAuth) {}
}
