import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RouterSelectors from '@core/selectors/router.selectors';
import * as CollectionSelectors from '@core/selectors/collection.selectors';
import { JoinSelectors } from '../selectors';
import { AuthSelectors } from '@auth/selectors';
import { JoinActions } from '../actions';
import { CoreActions } from '@core/actions';
import { exhaustMap, first, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Collection, QueryParamKey } from '@core/models';
import { collection, doc, docData, Firestore } from '@angular/fire/firestore';
import { User } from '@auth/models';
import { of } from 'rxjs';
import { Plan, StepPath } from '@app/join/models';
import { extract } from '@i18n/services';

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class JoinEffects {
  refreshSteps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JoinActions.refreshSteps),
      withLatestFrom(
        this.store.select(CollectionSelectors.entitySelectors<Plan>(Collection.Plans).selectEntities),
        this.store.select(JoinSelectors.selectSelectedPlanId),
        this.store.select(AuthSelectors.selectUser)
      ),
      switchMap(([, plans, selectedPlanId, user]) => {
        if (selectedPlanId && !plans[selectedPlanId]) {
          return docData<Partial<Plan>>(doc(collection(this.firestore, Collection.Plans), selectedPlanId), {
            idField: 'id'
          }).pipe(first(), withLatestFrom(of(user)));
        } else {
          return of([plans[selectedPlanId], user]);
        }
      }),
      switchMap(([selectedPlan, user]) => {
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

  nextStep$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JoinActions.nextStep),
      withLatestFrom(
        this.store.select(JoinSelectors.selectNextStepPath),
        this.store.select(RouterSelectors.selectQueryParam(QueryParamKey.ReturnUrl)),
        this.store.select(AuthSelectors.selectUser)
      ),
      exhaustMap(([action, path, url, user]) => {
        if (user && action.setFirestoreState) {
          this.actions$
            .pipe(
              ofType(CoreActions.setFirestoreStateSuccess),
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
          return [CoreActions.setFirestoreState(), JoinActions.refreshSteps()];
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

  previousStep$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(JoinActions.previousStep),
        withLatestFrom(this.store.select(JoinSelectors.selectPreviousStepPath)),
        tap(([, path]) => this.router.navigate([`/join/${path}`]).then())
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private store: Store, private router: Router, private firestore: Firestore) {}
}
