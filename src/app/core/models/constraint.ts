export interface Constraints {
  [name: string]: Constraint;
}

export interface Constraint {
  message?: string;
  max?: number;
  min?: number;
}
