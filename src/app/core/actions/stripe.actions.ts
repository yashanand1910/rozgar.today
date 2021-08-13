import { createAction, props } from '@ngrx/store';
import { CreatePaymentIntentInput } from '@core/models';

export const createPaymentIntent = createAction('[Stripe] Create Payment Intent', props<CreatePaymentIntentInput>());

export const createPaymentIntentSuccess = createAction(
  '[Stripe] Create Payment Intent Success',
  props<{ clientSecret?: string } & CreatePaymentIntentInput>()
);

export const createPaymentIntentFailiure = createAction(
  '[Stripe] Create Payment Intent Failiure',
  props<{ error: string } & CreatePaymentIntentInput>()
);
