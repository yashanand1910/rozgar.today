import { createAction, props } from '@ngrx/store';
import { Cart, PaymentIntent, PaymentIntentContext } from '@core/models';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

export const createPaymentIntent = createAction('[Stripe] Create Payment Intent', props<Cart>());

export const createPaymentIntentSuccess = createAction(
  '[Stripe] Create Payment Intent Success',
  props<{ context: PaymentIntentContext; customerId?: string } & Partial<PaymentIntent>>()
);

export const createPaymentIntentFailure = createAction(
  '[Stripe] Create Payment Intent Failure',
  props<{ context: PaymentIntentContext; error: FirebaseError }>()
);

export const updatePaymentIntent = createAction('[Stripe] Update Payment Intent', props<Cart>());

export const updatePaymentIntentSuccess = createAction(
  '[Stripe] Update Payment Intent Success',
  props<{ context: PaymentIntentContext } & Partial<PaymentIntent>>()
);

export const updatePaymentIntentFailure = createAction(
  '[Stripe] Update Payment Intent Failure',
  props<{ context: PaymentIntentContext; error: FirebaseError }>()
);

export const loadPaymentIntent = createAction('[Stripe] Load Payment Intent', props<Partial<Cart>>());

export const loadPaymentIntentSuccess = createAction(
  '[Stripe] Load Payment Intent Success',
  props<{ context: PaymentIntentContext } & Partial<PaymentIntent>>()
);

export const loadPaymentIntentFailure = createAction(
  '[Stripe] Load Payment Intent Failure',
  props<{ context: PaymentIntentContext; error: FirebaseError }>()
);
