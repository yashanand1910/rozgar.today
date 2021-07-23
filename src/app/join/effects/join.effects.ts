import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CoreSelectors from '@core/selectors';
import * as CoreActions from '@core/actions';
import * as JoinActions from '../actions';
import * as JoinSelectors from '../selectors';
import * as AuthSelectors from '@auth/selectors';
import {
  catchError,
  exhaustMap,
  first,
  map,
  mergeMap,
  observeOn,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Collection, QueryParamKey } from '@core/models';
import { AngularFirestore } from '@angular/fire/firestore';
import { StoreUser, User } from '@auth/models';
import { asyncScheduler, from, of } from 'rxjs';
import { joinFeatureKey, JoinFirestoreState } from '@app/join/reducers';
import { Plan, StepPath } from '@app/join/models';
import { extract } from '@i18n/services';

@Injectable()
export class JoinEffects {
  refreshSteps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JoinActions.refreshSteps),
      withLatestFrom(
        this.store.select(CoreSelectors.entitySelectors<Plan>(Collection.Plans).selectEntities),
        this.store.select(JoinSelectors.selectSelectedPlanId),
        this.store.select(AuthSelectors.selectAuthUser)
      ),
      switchMap(([, plans, selectedPlanId, user]) => {
        if (selectedPlanId && !plans[selectedPlanId]) {
          return this.afs
            .collection(Collection.Plans)
            .doc<Plan>(selectedPlanId)
            .valueChanges()
            .pipe(first(), withLatestFrom(of(user)));
        } else {
          return of([plans[selectedPlanId], user]);
        }
      }),
      mergeMap(([selectedPlan, user]) => {
        let nextActions = [];
        if (selectedPlan) {
          nextActions.push(
            JoinActions.setStepInfo({
              path: StepPath.Plan,
              description: (<Plan>selectedPlan).name,
              status: 'finish',
              disabled: false
            })
          );
        }
        if ((<User>user)?.emailVerified) {
          nextActions.push(
            JoinActions.setStepInfo({
              path: StepPath.Account,
              description: extract('Verified'),
              status: 'finish',
              disabled: false
            })
          );
        }
        return of(...nextActions);
      })
    )
  );

  nextJoinStep$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JoinActions.nextJoinStep),
      withLatestFrom(
        this.store.select(JoinSelectors.selectJoinNextStepPath),
        this.store.select(CoreSelectors.selectQueryParam(QueryParamKey.ReturnUrl)),
        this.store.select(AuthSelectors.selectAuthUser)
      ),
      exhaustMap(([action, path, url, user]) => {
        if (user && action.setFirestoreState) {
          this.actions$
            .pipe(
              ofType(JoinActions.setJoinFirestoreStateSuccess),
              first(),
              tap(() => {
                if (url) {
                  this.router.navigateByUrl(url, { replaceUrl: true }).then();
                } else {
                  this.router.navigate([`/join/${path}`]).then();
                }
              })
            )
            .subscribe();
          return [JoinActions.setJoinFirestoreState(), JoinActions.refreshSteps()];
        } else {
          if (url) {
            this.router.navigateByUrl(url, { replaceUrl: true }).then();
          } else {
            this.router.navigate([`/join/${path}`]).then();
          }
          return [JoinActions.refreshSteps()];
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

  setJoinFirestoreState$ = createEffect(() =>
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

  getJoinFirestoreState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JoinActions.getJoinFirestoreState),
      withLatestFrom(this.store.select(AuthSelectors.selectAuthUser)),
      switchMap(([, user]) => {
        if (user) {
          return this.afs
            .collection(Collection.Users)
            .doc<StoreUser>(user.uid)
            .valueChanges()
            .pipe(
              first(),
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

  getJoinFirestoreStateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JoinActions.getJoinFirestoreStateSuccess),
      switchMap(() => of(JoinActions.refreshSteps()))
    )
  );

  constructor(private actions$: Actions, private store: Store, private router: Router, private afs: AngularFirestore) {}
}
