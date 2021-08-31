import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ForgotPasswordActions } from '../actions';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { defer, of } from 'rxjs';
import firebase from 'firebase/compat/app';
import { getSerializableFirebaseError } from '@shared/helper';
import FirebaseError = firebase.FirebaseError;

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class ForgotPasswordEffects {
  forgotPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ForgotPasswordActions.forgotPassword),
      map((action) => action.context),
      exhaustMap((context) =>
        defer(() => sendPasswordResetEmail(this.auth, context.email)).pipe(
          map(() => ForgotPasswordActions.forgotPasswordSuccess()),
          catchError((error: FirebaseError) =>
            of(
              ForgotPasswordActions.forgotPasswordFailure({
                error: getSerializableFirebaseError(error)
              })
            )
          )
        )
      )
    );
  });

  constructor(private actions$: Actions, private auth: Auth) {}
}
