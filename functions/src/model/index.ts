import { Reference } from './collection';

export * from './collection';
export * from './user';

/**
 * Misc
 */

export interface Cart {
  context: PaymentIntentContext;
  id?: string; // Stripe PaymentIntent ID
  customerId?: string; // Stripe Customer ID
  products: Reference<Product>[]; // Reference to the Firestore document
}

// List of allowed contexts in order to reuse payment intents for a customer
export enum PaymentIntentContext {
  FirstTimePlanPurchase = 'firstTimePlanPurchase'
}

export type PaymentIntentOutput = {
  id: string;
  clientSecret: string;
} & Price;

export const enum Currency {
  INR = 'INR',
  USD = 'USD'
}

export const CurrencyMultiplier = {
  INR: 100,
  USD: 100
};

export interface Price {
  amount: number;
  currency: Currency;
}

export type Product = { price: Price; metadata?: Metadata; [fields: string]: unknown };

export interface Metadata {
  stripeId: string;
}
