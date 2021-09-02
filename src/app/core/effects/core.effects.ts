import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, first, map, observeOn, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertActions, ConstraintActions, CoreActions } from '@core/actions';
import { AuthActions } from '@auth/actions';
import { extract } from '@i18n/services';
import { NzMessageRef, NzMessageService } from 'ng-zorro-antd/message';
import { asyncScheduler, defer, of } from 'rxjs';
import { AuthSelectors } from '@auth/selectors';
import { CoreSelectors } from '../selectors';
import { Collection } from '@core/models';
import { StoreUser } from '@auth/models';
import { Store } from '@ngrx/store';
import { collection, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import { JoinActions } from '@app/join/actions';
import { getSerializableFirebaseError } from '@shared/helper';
import FirebaseError = firebase.FirebaseError;

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class CoreEffects {
  private errorMessageDuration = 9999999;
  private networkError: NzMessageRef;
  private loadingMessageDuration = 9999999;
  private loadingMessage: NzMessageRef;
  private loadingMessageCount = 0;

  initialize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.initialize),
      exhaustMap(() => [ConstraintActions.loadConstraints(), AlertActions.loadAlerts(), AuthActions.loadAuth()])
    )
  );

  setFirestoreState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.setFirestoreState),
      withLatestFrom(
        this.store.select(AuthSelectors.selectUser),
        this.store.select(CoreSelectors.selectFirestoreState)
      ),
      exhaustMap(([action, user, state]) =>
        defer(() => updateDoc(doc(collection(this.firestore, Collection.Users), user.uid), { state })).pipe(
          map(() => CoreActions.setFirestoreStateSuccess({ firstTime: action.firstTime })),
          catchError((error: FirebaseError) =>
            of(
              CoreActions.setFirestoreStateFailure({
                error: getSerializableFirebaseError(error)
              }),
              CoreActions.networkError()
            )
          )
        )
      )
    )
  );

  getFirestoreState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.getFirestoreState),
      withLatestFrom(this.store.select(AuthSelectors.selectUser)),
      exhaustMap(([, user]) => {
        if (user) {
          return docData<Partial<StoreUser>>(doc(collection(this.firestore, Collection.Users), user.uid)).pipe(
            first(),
            map((user) => user.state),
            map((state) => CoreActions.getFirestoreStateSuccess({ state })),
            catchError((error: FirebaseError) =>
              of(
                CoreActions.getFirestoreStateFailure({
                  error: getSerializableFirebaseError(error)
                }),
                CoreActions.networkError()
              )
            )
          );
        } else {
          return of(CoreActions.getFirestoreStateSuccess()).pipe(observeOn(asyncScheduler));
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

  constructor(
    private actions$: Actions,
    private router: Router,
    private messageService: NzMessageService,
    private store: Store,
    private firestore: Firestore
  ) {}
}
