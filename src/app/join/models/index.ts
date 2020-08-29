export * from './plan.model';

export enum FirebaseCollection {
  Plans = 'plans',
}

export interface Step {
  title: string;
  description?: string;
  path: string;
  icon: string;
}
