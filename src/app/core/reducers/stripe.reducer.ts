import { createReducer, on } from '@ngrx/store';
import * as StripeActions from '../actions/stripe.actions';

export const stripeFeatureKey = 'stripe';

export interface State {
  [productPath: string]: ProductPaymentState;
}

export interface ProductPaymentState {
  error: string;
  clientSecret: string;
}

export const initialState: State = {};

export const reducer = createReducer(
  initialState,

  on(StripeActions.createPaymentIntentSuccess, (state, action) => ({
    ...state,
    [action.productPath]: {
      ...state[action.productPath],
      clientSecret: action.clientSecret,
      error: null
    }
  })),
  on(StripeActions.createPaymentIntentFailiure, (state, action) => ({
    ...state,
    [action.productPath]: {
      ...state[action.productPath],
      error: action.error
    }
  }))
);
