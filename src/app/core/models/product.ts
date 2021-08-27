/**
 * Enum of allowed currencies
 */
export enum Currency {
  INR = 'INR',
  USD = 'USD'
}

export interface Price {
  amount: number;
  currency: Currency;
}

export type Product = { price: Price; metadata?: Metadata; [fields: string]: unknown };

export interface Metadata {
  stripeId: string;
}
