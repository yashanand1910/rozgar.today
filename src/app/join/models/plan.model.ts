export enum PlanType {
  Basic = 'Basic',
  Standard = 'Standard',
  Premium = 'Premium',
}

interface Point {
  key: string;
  value: boolean | string;
}

export interface Plan {
  id: string;
  type: PlanType;
  highlight: string;
  price: number;
  points: Point[];
}
