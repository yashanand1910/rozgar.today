import { createReducer, on } from '@ngrx/store';
import * as StripeActions from '../actions/stripe.actions';
import * as CoreActions from '../actions/core.actions';

export const featureKey = 'stripe';

export interface State {
  [productPath: string]: ProductPaymentIntent;
}

export interface ProductPaymentIntent {
  error: string;
  clientSecret: string;
  id: string;
}

export const initialState: State = {
  abcd: {
    id: null,
    clientSecret: null,
    error: null
  }
};

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
  })),
  on(CoreActions.getFirestoreStateSuccess, (state, action) => {
    return action.state
      ? {
          ...state,
          ...action.state[featureKey]
        }
      : {
          ...state,
        };
  })
);
