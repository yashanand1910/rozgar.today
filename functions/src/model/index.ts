export * from './collection';
export * from './user';

/**
 * Misc
 */

export interface CreatePaymentIntentInput {
  stripeCustomerId: string; // Stripe Customer ID
  productPath: string; // Path to the Firestore document
}

export const enum Currency {
  INR = 'inr',
  USD = 'usd'
}

export const enum CurrencyMultiplier {
  INR = 100,
  USD = 100
}

export interface Price {
  amount: number;
  currency: Currency;
}

export type Product = { price: Price; [fields: string]: unknown };
