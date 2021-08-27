import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Plan } from '@app/join/models';
import { CollectionItem } from '@core/models';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanComponent {
  @Input() plan: CollectionItem<Plan>;
  @Input() isCurrent: boolean;
  @Output() selectPlan = new EventEmitter<string>();

  constructor() {}

  isBoolean = (val: any) => {
    return typeof val === 'boolean';
  };
}
