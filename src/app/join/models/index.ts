export * from './plan.model';

export interface Step {
  title: string;
  description?: string;
  path: string;
  icon: string;
}
