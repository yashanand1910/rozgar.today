export enum PlanName {
  Basic = 'Basic',
  Standard = 'Standard',
  Premium = 'Premium'
}

interface Point {
  key: string;
  value: boolean | string;
}

export interface Plan {
  // id: string;
  name: PlanName;
  highlight: string;
  price: number;
  points: Point[];
}
