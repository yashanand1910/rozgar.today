import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ForgotPasswordActions } from '../actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, of } from 'rxjs';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;
import { getSerializableFirebaseError } from '@shared/helper';

@Injectable()
export class ForgotPasswordEffects {
  forgotPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ForgotPasswordActions.forgotPassword),
      map((action) => action.context),
      exhaustMap((context) =>
        from(this.afa.sendPasswordResetEmail(context.email)).pipe(
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

  constructor(private actions$: Actions, private afa: AngularFireAuth) {}
}
