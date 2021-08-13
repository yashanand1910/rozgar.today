/**
 * Available Firebase Functions on call / Types etc.
 */

export enum Function {
  CreatePaymentIntent = 'createPaymentIntent'
}

export interface CreatePaymentIntentInput {
  stripeCustomerId?: string; // Stripe ID of the user
  productPath: string; // Path to the Firestore document
}

export interface CreatePaymentIntentOutput {
  clientSecret: string; // Returned by the Stripe API
}
