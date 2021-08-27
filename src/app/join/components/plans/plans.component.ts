import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '@app/join/models';
import { CollectionActions } from '@core/actions';
import { CollectionSelectors } from '@core/selectors';
import { JoinActions } from '@app/join/actions';
import { JoinSelectors } from '@app/join/selectors';
import { CoreSelectors } from '@core/selectors';
import { Collection, CollectionItem } from '@core/models';
import { StepComponent } from '../step.component';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.less', '../join.component.less']
})
export class PlansComponent extends StepComponent implements OnInit {
  selectedPlanId$: Observable<string>;
  plans$: Observable<CollectionItem<Plan>[]>;
  isLoading$: Observable<boolean>;
  coreIsProcessing$: Observable<boolean>;

  ngOnInit(): void {
    super.ngOnInit();

    this.store.dispatch(CollectionActions.loadCollection({ collection: Collection.Plans }));

    this.isLoading$ = this.store.select(CollectionSelectors.selectIsLoading<Plan>(Collection.Plans));
    this.plans$ = this.store.select(CollectionSelectors.entitySelectors<Plan>(Collection.Plans).selectAll);
    this.selectedPlanId$ = this.store.select(JoinSelectors.selectSelectedPlanId);
    this.coreIsProcessing$ = this.store.select(CoreSelectors.selectIsProcessing);
  }

  selectPlan(id: string) {
    this.store.dispatch(JoinActions.selectPlan({ id }));
  }
}
