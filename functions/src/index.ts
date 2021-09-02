import { Cart, Collection, Currency, CurrencyMultiplier, Price, Product, StoreUser } from './model';
import {
  generateIdempotencyKey,
  generatePaymentIntentMetadata,
  generatePaymentIntentOutput,
  getContextDescription,
  getDisplayName
} from './helper';

import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import Stripe from 'stripe';

// Initialize
firebase.initializeApp();
const stripe = new Stripe(functions.config().stripe.secret, { apiVersion: '2020-08-27' });
const logger = functions.logger;

/**
 * Delete user record in Firestore when user account is deleted
 */
exports.deleteUser = functions.auth.user().onDelete((user) => {
  return firebase.firestore().collection(Collection.Users).doc(user.uid).delete();
});

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
 */
exports.createPaymentIntent = functions.https.onCall(async (cart: Cart) => {
  logger.log('Creating payment intent on Stripe...');
  const paymentIntent = await stripe.paymentIntents.create(
    {
      ...(await calculateTotalPrice(cart.products)),
      customer: cart.customerId,
      description: getContextDescription(cart.context),
      metadata: generatePaymentIntentMetadata(cart)
    },
    { idempotencyKey: generateIdempotencyKey(cart.context, <string>cart.customerId, 'create') }
  );

  return generatePaymentIntentOutput(paymentIntent);
});

/**
 * Update a Stripe PaymentIntent
 */
exports.updatePaymentIntent = functions.https.onCall(async (cart: Cart) => {
  logger.log('Creating payment intent on Stripe...');
  const paymentIntent = await stripe.paymentIntents.update(<string>cart.id, {
    ...(await calculateTotalPrice(cart.products)),
    description: getContextDescription(cart.context),
    metadata: generatePaymentIntentMetadata(cart)
  });

  return generatePaymentIntentOutput(paymentIntent);
});

/**
 * TODO Load a Stripe PaymentIntent
 */
exports.loadPaymentIntent = functions.https.onCall(async ({ id }) => {
  return generatePaymentIntentOutput(await stripe.paymentIntents.retrieve(id));
});

/*******************
 * Helpers
 *******************/

/**
 * Calculate total price of products after fetching from Firestore
 * @param {Reference<Product>[]} productReferences
 * @return {Promise<Price>} Promise of total price
 */
const calculateTotalPrice = async (productReferences: Cart['products']): Promise<Price> => {
  // Get products from Firestore
  logger.log('Getting products from Firestore...');

  const products = [];
  for (const reference of productReferences) {
    const product = <Product>(
      (await firebase.firestore().collection(reference.collection).doc(reference.id).get()).data()
    );

    // Since Stripe takes input amount in Paisa/Cents, use multiplier
    product.price.amount = CurrencyMultiplier[product.price.currency] * product.price.amount;

    products.push(product);
  }

  // TODO consider currency conversion by setting a default currency for calculations
  return products
    .map((product) => product.price)
    .reduce((a, b) => ({ amount: a.amount + b.amount, currency: Currency.INR }));
};
