import { PaymentIntentInput, Product } from './model';

const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const stripe = require('stripe')(functions.config.stripe.secret);

// Initialize
firebase.initializeApp();

/**
 * Create a Stripe PaymentIntent
 *
 * @params data - { item: 'path/to/document/in/firestore' }
 * @returns { clientSecret }
 */
exports.createPaymentIntent = functions.https.onCall(async (data: PaymentIntentInput) => {
  // Get product
  const product = <Product>await firebase.firestore().doc(data.productPath).get();

  // Create PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create(product.price);

  // Return client secret
  return {
    clientSecret: paymentIntent.client_secret
  };
});
