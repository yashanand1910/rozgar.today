import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map } from 'rxjs/operators';

import * as ForgotPasswordActions from '../actions/forgot-password.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, of } from 'rxjs';

@Injectable()
export class ForgotPasswordEffects {
  forgotPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ForgotPasswordActions.forgotPassword),
      map((action) => action.context),
      exhaustMap((context) =>
        from(this.afa.sendPasswordResetEmail(context.email)).pipe(
          map(() => ForgotPasswordActions.forgotPasswordSuccess()),
          catchError((error) => of(ForgotPasswordActions.forgotPasswordFailiure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private afa: AngularFireAuth) {}
}
