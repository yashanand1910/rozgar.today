import { Product } from '@core/models/product';

// noinspection JSUnusedGlobalSymbols
export enum PlanName {
  Basic = 'Basic',
  Standard = 'Standard',
  Premium = 'Premium'
}

interface Point {
  key: string;
  value: boolean | string;
}

export interface Plan extends Product {
  id: string;
  name: PlanName;
  highlight: string;
  points: Point[];
}
