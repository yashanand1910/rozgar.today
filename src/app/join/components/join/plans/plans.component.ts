import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromJoin from '@app/join/reducers';
import * as JoinSelectors from '@app/join/selectors';
import { select, Store } from '@ngrx/store';
import { Plan } from '@app/join/models';
import * as Actions from '@app/join/actions';
import { untilDestroyed } from '@core/utils';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.less', '../join.component.less'],
})
export class PlansComponent implements OnInit, OnDestroy {
  currentPlanId$: Observable<Plan['id']>;
  plans$: Observable<Plan[]>;
  isLoading$: Observable<boolean>;

  constructor(private router: Router, private store: Store<fromJoin.State>) {}

  ngOnInit(): void {
    this.store
      .pipe(select(JoinSelectors.selectPlansHasLoaded), untilDestroyed(this))
      .subscribe((hasLoaded) => (!hasLoaded ? this.store.dispatch(Actions.loadPlans()) : null));
    this.isLoading$ = this.store.pipe(select(JoinSelectors.selectPlansIsLoading));
    this.plans$ = this.store.pipe(select(JoinSelectors.selectAllPlans));
    this.currentPlanId$ = this.store.pipe(select(JoinSelectors.selectCurrentPlanId));
  }

  ngOnDestroy() {}

  next() {
    this.store.dispatch(Actions.nextStep());
  }

  selectPlan(id: Plan['id']) {
    this.store.dispatch(Actions.setCurrentPlan({ id }));
  }
}
