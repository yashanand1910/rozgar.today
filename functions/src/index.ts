import { Collection, CreatePaymentIntentInput, CurrencyMultiplier, Product, StoreUser } from './model';
import { getDisplayName, getIdempotencyKey } from './helper';

import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import Stripe from 'stripe';

// Initialize
firebase.initializeApp();
const stripe = new Stripe(functions.config().stripe.secret, { apiVersion: '2020-08-27' });
const logger = functions.logger;

/**
 * TODO Delete user record in Firestore when user account is deleted
 */

/**
 * Create Stripe Customer when user document is created in Firestore
 */
exports.createCustomer = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snapshot: firebase.firestore.QueryDocumentSnapshot<StoreUser>, context: functions.EventContext) => {
    const profile = snapshot.data().profile;

    // Create customer on Stripe
    logger.log('Creating customer on Stripe...');
    const customer = profile
      ? await stripe.customers.create({
          name: getDisplayName(profile.firstName, profile.lastName),
          email: profile.email,
          phone: profile.phoneNumber,
          metadata: {
            firebaseUid: context.params.userId
          }
        })
      : null;

    // Update stripeId on user record in Firestore
    logger.log('Updating stripeId on user record in Firestore...');
    return firebase
      .firestore()
      .collection(Collection.Users)
      .doc(context.params.userId)
      .update({ 'metadata.stripeId': customer?.id });
  });

/**
 * TODO Update Stripe Customer when user/profile is updated in Firestore
 */

/**
 * TODO Update/Delete Stripe Customer when user document is deleted in Firestore
 */

/**
 * Create a Stripe PaymentIntent
 *
 * @params data - { productPath: 'path/to/document/in/firestore' }
 * @returns { clientSecret }
 */
exports.createPaymentIntent = functions.https.onCall(async (data: CreatePaymentIntentInput) => {
  // Get product
  logger.log('Getting product from Firestore...');
  const product = <Product>(await firebase.firestore().doc(data.productPath).get()).data();

  // Since Stripe takes input amount in Paisa/Cents
  product.price.amount = CurrencyMultiplier.INR * product.price.amount;

  // Create PaymentIntent
  logger.log('Creating payment intent on Stripe...');
  const paymentIntent = await stripe.paymentIntents.create({
    ...product.price,
    customer: data.stripeCustomerId
  }, { idempotencyKey: getIdempotencyKey(data.stripeCustomerId, data.productPath) });

  // Return client secret & id
  return {
    id: paymentIntent.id,
    clientSecret: paymentIntent.client_secret
  };
});
