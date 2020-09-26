import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CoreSelectors from '@core/selectors';
import * as CoreActions from '@core/actions';
import * as JoinActions from '../actions';
import * as JoinSelectors from '../selectors';
import * as AuthSelectors from '@auth/selectors';
import { catchError, delay, exhaustMap, map, observeOn, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Collection, QueryParamKey } from '@core/models';
import { AngularFirestore } from '@angular/fire/firestore';
import { StoreUser } from '@auth/models';
import { asyncScheduler, EMPTY, from, of } from 'rxjs';
import { joinFeatureKey, JoinFirestoreState } from '@app/join/reducers';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class JoinEffects {
  nextJoinStep$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JoinActions.nextJoinStep),
      withLatestFrom(
        this.store.select(JoinSelectors.selectJoinNextStepPath),
        this.store.select(CoreSelectors.selectQueryParam(QueryParamKey.Redirect)),
        this.store.select(AuthSelectors.selectAuthUser)
      ),
      exhaustMap(([, path, redirectUrl, user]) => {
        if (user) {
          this.actions$
            .pipe(
              ofType(JoinActions.setJoinFirestoreStateSuccess),
              take(1),
              tap(() => this.router.navigate([redirectUrl ? redirectUrl : `/join/${path}`]).then())
            )
            .subscribe();
          return of(JoinActions.setJoinFirestoreState());
        } else {
          this.router.navigate([redirectUrl ? redirectUrl : `/join/${path}`]).then();
          return EMPTY;
        }
      })
    )
  );

  previousJoinStep$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(JoinActions.previousJoinStep),
        withLatestFrom(this.store.select(JoinSelectors.selectJoinPreviousStepPath)),
        tap(([, path]) => this.router.navigate([`/join/${path}`]).then())
      ),
    { dispatch: false }
  );

  setJoinFirestoreState = createEffect(() =>
    this.actions$.pipe(
      ofType(JoinActions.setJoinFirestoreState),
      withLatestFrom(this.store.select(AuthSelectors.selectAuthUser), this.store.select(JoinSelectors.selectJoinState)),
      exhaustMap(([action, user, state]) =>
        from(
          this.afs
            .collection(Collection.Users)
            .doc<StoreUser>(user.uid)
            .update({
              state: {
                [joinFeatureKey]: { ...new JoinFirestoreState(state) }
              }
            })
        ).pipe(
          map(() => JoinActions.setJoinFirestoreStateSuccess()),
          catchError((error) =>
            of(JoinActions.setJoinFirestoreStateFailiure({ error: error.code }), CoreActions.networkError())
          )
        )
      )
    )
  );

  getJoinFirestoreState = createEffect(() =>
    this.actions$.pipe(
      ofType(JoinActions.getJoinFirestoreState),
      // Can't use withLatestFrom here because this effect is triggered in router i.e. way before it emits any value
      exhaustMap(() => this.afa.user.pipe(take(1))),
      switchMap((user) => {
        if (user) {
          return this.afs
            .collection(Collection.Users)
            .doc<StoreUser>(user.uid)
            .valueChanges()
            .pipe(
              take(1),
              map((storeUser) => (storeUser.state ? storeUser.state[joinFeatureKey] : null)),
              map((state) => JoinActions.getJoinFirestoreStateSuccess({ state })),
              catchError((error) =>
                of(JoinActions.getJoinFirestoreStateFailiure({ error: error.code }), CoreActions.networkError())
              )
            );
        } else {
          return of(JoinActions.getJoinFirestoreStateSuccess({})).pipe(observeOn(asyncScheduler));
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private router: Router,
    private afs: AngularFirestore,
    private afa: AngularFireAuth
  ) {}
}
