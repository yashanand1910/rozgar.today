export * from './plan.model';

export interface Step {
  title: string;
  description?: string;
  path: StepPath;
  icon: string;
}

export enum StepPath {
  Plan = 'plan',
  Account = 'account',
  Payment = 'payment',
  Resume = 'resume'
}
