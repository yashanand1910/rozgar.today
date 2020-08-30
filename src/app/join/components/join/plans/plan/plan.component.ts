import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plan } from '@app/join/models';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanComponent implements OnInit {
  @Input() plan: Plan;
  @Input() isCurrent: boolean;
  @Output() selectPlan = new EventEmitter<Plan['id']>();

  constructor() {}

  ngOnInit(): void {}

  isBoolean = (val: any) => {
    return typeof val === 'boolean';
  };
}
