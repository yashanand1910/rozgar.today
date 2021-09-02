import { Cart, Currency, PaymentIntentContext, PaymentIntentOutput } from './model';
import contextDescriptions from './context-descriptions.json';
import Stripe from 'stripe';

/**
 * Gets display name from first name & last name
 * @param {string} firstName
 * @param {string} lastName
 * @return {string} Display name
 */
export const getDisplayName = (firstName: string, lastName: string): string => {
  firstName = firstName.trim();
  lastName = lastName.trim();
  return `${firstName.substr(0, 1).toUpperCase()}${firstName.substring(1)} ${lastName
    .substr(0, 1)
    .toUpperCase()}${lastName.substring(1)}`;
};

/**
 * Generates an idempotency key from the provided values
 * @param {string} primaryKey
 * @param {string} secondaryKey
 * @param {string} operation
 * @return {string} Idempotency key
 */
export const generateIdempotencyKey = (primaryKey: string, secondaryKey: string, operation: string): string => {
  return `${primaryKey}-${secondaryKey}-${operation}`;
};

/**
 * Gets description of the context
 * @param {PaymentIntentContext} context
 * @return {string} Description (from stored JSON)
 */
export const getContextDescription = (context: PaymentIntentContext): string => {
  return contextDescriptions[context];
};

/**
 * Generates the output object from payment intent returned by the Stripe API
 * @param {Stripe.PaymentIntent} paymentIntent
 * @return {PaymentIntentOutput} A payment intent object
 */
export const generatePaymentIntentOutput = (paymentIntent: Stripe.PaymentIntent): PaymentIntentOutput => {
  return {
    id: paymentIntent.id,
    clientSecret: <string>paymentIntent.client_secret,
    amount: paymentIntent.amount,
    currency: <Currency>paymentIntent.currency.toUpperCase()
  };
};

/**
 * Generates the metadata object to be stored in Stripe for payment intents
 * @param {Cart} cart
 * @return {Stripe.MetadataParam} Payment Intent Metadata object
 */
export const generatePaymentIntentMetadata = (cart: Cart): Stripe.MetadataParam => {
  return {
    context: cart.context,
    firebaseProducts: JSON.stringify(cart.products)
  };
};
