import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, switchMap, take } from 'rxjs/operators';
import * as AuthActions from '@auth/actions';
import * as fromAuth from '../reducers';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseCollection, UserProfile } from '@auth/models';

@Injectable()
export class SignupEffects {
  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUp),
      map((props) => props.signupContext),
      exhaustMap((context) =>
        from(this.afa.createUserWithEmailAndPassword(context.email, context.password)).pipe(
          switchMap((userCredential) =>
            userCredential.user
              .updateProfile({
                displayName: this.getDisplayName(context.firstName, context.lastName),
              })
              .then(() => userCredential)
          ),
          switchMap((userCredential) =>
            this.afs
              .collection<UserProfile>(FirebaseCollection.UserProfiles)
              .doc<UserProfile>(userCredential.user.uid)
              .set({
                phoneNumber: this.getPhoneNumber(context.phoneNumberPrefix, context.phoneNumber),
              })
          ),
          switchMap(() => [AuthActions.signUpSuccess(), AuthActions.sendVerificationEmail()]),
          catchError((error) => of(AuthActions.signUpFailed({ error })))
        )
      )
    );
  });

  sendVerificationEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.sendVerificationEmail),
      exhaustMap(() =>
        this.afa.user.pipe(
          take(1),
          mergeMap((user) =>
            from(user.sendEmailVerification()).pipe(
              map(() => {
                this.messageService.info('An email has been sent for verification. Please check your inbox/spam.');
                return AuthActions.sendVerificationEmailSuccess();
              }),
              catchError((error) => of(AuthActions.sendVerificationEmailFailed({ error })))
            )
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private store: Store<fromAuth.State>,
    private messageService: NzMessageService
  ) {}

  getDisplayName(firstName: string, lastName: string) {
    return `${firstName.substr(0, 1).toUpperCase()}${firstName.substring(1)} ${lastName
      .substr(0, 1)
      .toUpperCase()}${lastName.substring(1)}`;
  }

  getPhoneNumber(prefix: string, number: string) {
    return `${prefix}${number}`;
  }
}
