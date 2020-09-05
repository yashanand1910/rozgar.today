export * from './plan.model';

export enum FirestoreCollection {
  Plans = 'plans',
}

export interface Step {
  title: string;
  description?: string;
  path: string;
  icon: string;
}
