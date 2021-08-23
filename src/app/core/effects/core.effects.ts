import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, observeOn, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as CoreActions from '@core/actions';
import * as AuthActions from '@auth/actions';
import { extract } from '@i18n/services';
import { NzMessageRef, NzMessageService } from 'ng-zorro-antd/message';
import { asyncScheduler, from, of } from 'rxjs';
import * as AuthSelectors from '@auth/selectors';
import * as CoreSelectors from '../selectors';
import { Collection } from '@core/models';
import { StoreUser } from '@auth/models';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import FirebaseError = firebase.FirebaseError;
import * as JoinActions from '@app/join/actions';

@Injectable()
export class CoreEffects {
  initialize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.initialize),
      exhaustMap(() => [CoreActions.loadConstraints(), CoreActions.loadAlerts(), AuthActions.loadAuth()])
    )
  );

  setFirestoreState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.setFirestoreState),
      withLatestFrom(
        this.store.select(AuthSelectors.selectUser),
        this.store.select(CoreSelectors.selectFirestoreState)
      ),
      exhaustMap(([, user, state]) =>
        from(
          this.afs.collection(Collection.Users).doc<StoreUser>(user.uid).update({
            state
          })
        ).pipe(
          map(() => CoreActions.setFirestoreStateSuccess()),
          catchError((error: FirebaseError) =>
            of(CoreActions.setFirestoreStateFailiure({ error: error.code }), CoreActions.networkError())
          )
        )
      )
    )
  );

  getFirestoreState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.getFirestoreState),
      withLatestFrom(this.store.select(AuthSelectors.selectUser)),
      switchMap(([, user]) => {
        if (user) {
          return this.afs
            .collection(Collection.Users)
            .doc<StoreUser>(user.uid)
            .get()
            .pipe(
              map((snapshot) => snapshot.data().state),
              map((state) => CoreActions.getFirestoreStateSuccess({ state })),
              catchError((error: FirebaseError) =>
                of(CoreActions.getFirestoreStateFailiure({ error: error.code }), CoreActions.networkError())
              )
            );
        } else {
          return of(CoreActions.getFirestoreStateSuccess({})).pipe(observeOn(asyncScheduler));
        }
      })
    )
  );

  getFirestoreStateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.getFirestoreStateSuccess),
      switchMap(() => of(JoinActions.refreshSteps()))
    )
  );

  networkError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActions.networkError),
        tap(() => {
          if (!this.networkError) {
            this.networkError = this.messageService.error(
              extract('Please check your internet connection and reload.'),
              {
                nzDuration: this.errorMessageDuration
              }
            );
          }
        })
      ),
    { dispatch: false }
  );

  showLoadingMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoreActions.showLoadingMessage),
        tap(() => {
          if (!this.loadingMessage) {
            this.loadingMessage = this.messageService.loading(extract('Please wait...'), {
              nzDuration: this.loadingMessageDuration
            });
          }
          this.loadingMessageCount++;
          console.warn(this.loadingMessageCount);
        })
      ),
    { dispatch: false }
  );

  clearLoadingMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        observeOn(asyncScheduler),
        ofType(CoreActions.clearLoadingMessage),
        tap(() => {
          if (this.loadingMessageCount) {
            if (this.loadingMessageCount === 1) {
              this.messageService.remove(this.loadingMessage.messageId);
            }
            this.loadingMessageCount--;
            console.warn(this.loadingMessageCount);
          }
        })
      ),
    { dispatch: false }
  );

  private errorMessageDuration = 9999999;
  private networkError: NzMessageRef;
  private loadingMessageDuration = 9999999;
  private loadingMessage: NzMessageRef;
  private loadingMessageCount = 0;

  constructor(
    private actions$: Actions,
    private router: Router,
    private messageService: NzMessageService,
    private store: Store,
    private afs: AngularFirestore
  ) {}
}
