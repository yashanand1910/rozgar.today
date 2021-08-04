export interface PaymentIntentInput {
  productPath: string; // Path to the Firestore document
}

/**
 * Enum of allowed currencies
 */
export enum Currency {
  INR = 'inr',
  USD = 'usd'
}

export interface Price {
  amount: number;
  currency: Currency;
}

export type Product = { price: Price; [fields: string]: unknown };
