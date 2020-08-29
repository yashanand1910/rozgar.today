import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromJoin from '@app/join/reducers';
import { select, Store } from '@ngrx/store';
import { Plan } from '@app/join/models';
import * as Actions from '@app/join/actions';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.less', '../join.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansComponent implements OnInit {
  currentPlanId$: Observable<Plan['id']>;
  plans$: Observable<Plan[]>;
  isLoading$: Observable<boolean>;

  constructor(private router: Router, private store: Store<fromJoin.State>) {}

  ngOnInit(): void {
    this.store.dispatch(Actions.loadPlans());
    this.isLoading$ = this.store.pipe(select(fromJoin.selectPlansIsLoading));
    this.plans$ = this.store.pipe(select(fromJoin.selectAllPlans));
    this.currentPlanId$ = this.store.pipe(select(fromJoin.selectCurrentPlanId));
  }

  next() {
    this.store.dispatch(Actions.nextStep());
  }

  selectPlan(id: Plan['id']) {
    this.store.dispatch(Actions.setCurrentPlan({ id }));
  }
}
