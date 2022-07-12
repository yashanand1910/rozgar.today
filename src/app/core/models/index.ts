export * from './collection';
export * from './country';
export * from './router';
export * from './functions';

export enum CoreConfig {
  Alerts = 'alerts',
  Constraints = 'constraints'
}

export interface Alerts {
  [component: string]: Alert;
}

export interface Alert {
  info?: string[];
  warn?: string[];
}

export interface Constraints {
  [name: string]: Constraint;
}

export interface Constraint {
  message?: string;
  max?: number;
  min?: number;
}

export interface Config {
  alerts: Alerts;
  constraints: Constraints;
}
