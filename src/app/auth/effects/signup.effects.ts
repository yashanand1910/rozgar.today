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
import { FirestoreCollection, StoreUser, User } from '@auth/models';
import { extract } from '@i18n/services';

@Injectable()
export class SignupEffects {
  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUp),
      map((props) => props.context),
      exhaustMap((context) =>
        from(this.afa.createUserWithEmailAndPassword(context.email, context.password)).pipe(
          // Update display name
          switchMap((userCredential) => {
            const partialUser: Partial<User> = {
              displayName: this.getDisplayName(context.firstName, context.lastName),
              uid: userCredential.user.uid
            };
            return userCredential.user.updateProfile(partialUser).then(() => partialUser);
          }),
          // Update phone number
          switchMap((user) => {
            user = {
              ...user,
              phoneNumber: this.getPhoneNumber(context.phoneNumberPrefix, context.phoneNumber)
            };
            return this.afs
              .collection<StoreUser>(FirestoreCollection.Users)
              .doc<StoreUser>(user.uid)
              .set({
                profile: user
              })
              .then(() => user);
          }),
          switchMap((user: Partial<User>) => {
            this.messageService.success(extract('Account creation successful.'));
            return [
              AuthActions.signUpSuccess(),
              AuthActions.sendVerificationEmail(),
              AuthActions.getPartialUserSuccess({ user })
            ];
          }),
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
