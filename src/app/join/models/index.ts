import { NzStatusType } from 'ng-zorro-antd/steps';

export * from './plan.model';

export interface Step {
  title: string;
  description?: string;
  status?: NzStatusType;
  path: StepPath;
  icon: string;
  disabled?: boolean;
}

export enum StepPath {
  Plan = 'plan',
  Account = 'account',
  Payment = 'payment',
  Resume = 'resume'
}
