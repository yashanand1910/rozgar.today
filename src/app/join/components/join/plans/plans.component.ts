import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as JoinSelectors from '@app/join/selectors';
import { Store } from '@ngrx/store';
import { Plan } from '@app/join/models';
import * as JoinActions from '@app/join/actions';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.less', '../join.component.less']
})
export class PlansComponent implements OnInit {
  currentPlanId$: Observable<Plan['id']>;
  plans$: Observable<Plan[]>;
  isLoading$: Observable<boolean>;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(JoinActions.loadPlans());
    this.isLoading$ = this.store.select(JoinSelectors.selectPlansIsLoading);
    this.plans$ = this.store.select(JoinSelectors.selectAllPlans);
    this.currentPlanId$ = this.store.select(JoinSelectors.selectCurrentPlanId);
  }

  next() {
    this.store.dispatch(JoinActions.nextJoinStep());
  }

  selectPlan(id: Plan['id']) {
    this.store.dispatch(JoinActions.setCurrentPlan({ id }));
  }
}
