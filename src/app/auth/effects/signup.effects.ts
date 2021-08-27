import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthActions, SignupActions } from '@auth/actions';
import { CoreActions } from '@core/actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AngularFirestore } from '@angular/fire/firestore';
import { StoreUser, User } from '@auth/models';
import { extract } from '@i18n/services';
import { Collection } from '@core/models';
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

@Injectable()
export class SignupEffects {
  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SignupActions.signUp),
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
          // Update other details
          switchMap((user) => {
            // Remove passwords etc. to create a safe context (profile) for storage
            const { password, confirmPassword, ...profile } = context;
            return this.afs
              .collection<StoreUser>(Collection.Users)
              .doc<StoreUser>(user.uid)
              .set({ profile })
              .then(() => user);
          }),
          switchMap((user: Partial<User>) => {
            this.messageService.success(extract('Account creation successful.'));
            return [
              SignupActions.signUpSuccess(),
              SignupActions.sendVerificationEmail(),
              AuthActions.getPartialUserSuccess({ user }),
              CoreActions.setFirestoreState({ firstTime: true })
            ];
          }),
          catchError((error: FirebaseError) =>
            of(
              SignupActions.signUpFailiure({
                error: { code: error.code, message: error.message, name: error.name, stack: error.stack }
              })
            )
          )
        )
      )
    );
  });

  sendVerificationEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SignupActions.sendVerificationEmail),
      withLatestFrom(this.afa.authState),
      exhaustMap(([, user]) =>
        from(user.sendEmailVerification()).pipe(
          map(() => {
            this.messageService.info(extract('A verification email has been sent.'));
            return SignupActions.sendVerificationEmailSuccess();
          }),
          catchError((error: FirebaseError) => {
            this.messageService.error(this.translationService.instant(error.code));
            return of(
              SignupActions.sendVerificationEmailFailiure({
                error: { code: error.code, message: error.message, name: error.name, stack: error.stack }
              })
            );
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private store: Store,
    private messageService: NzMessageService,
    private translationService: TranslateService
  ) {}

  getDisplayName(firstName: string, lastName: string) {
    firstName = firstName.trim();
    lastName = lastName.trim();
    return `${firstName.substr(0, 1).toUpperCase()}${firstName.substring(1)} ${lastName
      .substr(0, 1)
      .toUpperCase()}${lastName.substring(1)}`;
  }

  getPhoneNumber(code: string, number: string) {
    return `${code}${number}`;
  }
}
