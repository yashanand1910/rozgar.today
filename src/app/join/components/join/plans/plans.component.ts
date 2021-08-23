import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '@app/join/models';
import * as CoreActions from '@core/actions';
import * as CollectionSelectors from '@core/selectors/collection.selectors';
import * as JoinActions from '@app/join/actions';
import * as JoinSelectors from '@app/join/selectors';
import * as CoreSelectors from '@core/selectors';
import { Collection, CollectionItem } from '@core/models';
import { StepComponent } from '../step.component';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.less', '../join.component.less']
})
export class PlansComponent extends StepComponent implements OnInit, OnDestroy {
  selectedPlanId$: Observable<string>;
  plans$: Observable<CollectionItem<Plan>[]>;
  isLoading$: Observable<boolean>;
  coreIsProcessing$: Observable<boolean>;

  ngOnInit(): void {
    super.ngOnInit();

    this.store.dispatch(CoreActions.loadCollection({ collection: Collection.Plans }));

    this.isLoading$ = this.store.select(CollectionSelectors.selectIsLoading<Plan>(Collection.Plans));
    this.plans$ = this.store.select(CollectionSelectors.entitySelectors<Plan>(Collection.Plans).selectAll);
    this.selectedPlanId$ = this.store.select(JoinSelectors.selectSelectedPlanId);
    this.coreIsProcessing$ = this.store.select(CoreSelectors.selectIsProcessing);
  }

  ngOnDestroy() {}

  selectPlan(id: string) {
    this.store.dispatch(JoinActions.selectPlan({ id }));
  }
}
