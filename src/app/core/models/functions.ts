import { Price, Product } from '../models/product';
import { Reference } from '../models/collection';

/**
 * Available Firebase Functions on call / Types etc.
 */

export enum Function {
  CreatePaymentIntent = 'createPaymentIntent',
  UpdatePaymentIntent = 'updatePaymentIntent',
  LoadPaymentIntent = 'loadPaymentIntent'
}

// List of allowed contexts in order to reuse payment intents for a customer
export enum PaymentIntentContext {
  FirstTimePlanPurchase = 'firstTimePlanPurchase'
}

export interface Cart {
  context: PaymentIntentContext;
  id?: string; // Stripe ID of payment intent
  customerId?: string; // Stripe ID of the user
  products: Reference<Product>[]; // Array of Firestore references
}

export type PaymentIntent = {
  clientSecret?: string;
  id?: string;
  products: Cart['products'];
} & Partial<Price>;
