import { createReducer, on } from '@ngrx/store';
import { StripeActions } from '../actions';
import { CoreActions } from '../actions';
import { AuthActions } from '@auth/actions';
import { PaymentIntent } from '@core/models';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

export const featureKey = 'stripe';

export type State = {
  paymentIntentState: {
    [context: string]: PaymentIntentState | undefined;
  };
  customerId?: string;
};

export type PaymentIntentState = {
  error?: FirebaseError;
} & PaymentIntent;

export const initialState: State = {
  paymentIntentState: {}
};

export const reducer = createReducer(
  initialState,
  on(StripeActions.createPaymentIntent, (state, action) => ({
    ...state,
    paymentIntentState: {
      ...state.paymentIntentState,
      [action.context]: {
        ...state.paymentIntentState[action.context],
        productPaths: action.products
      }
    }
  })),
  on(StripeActions.createPaymentIntentSuccess, (state, action) => ({
    ...state,
    customerId: action.customerId ? action.customerId : state.customerId,
    paymentIntentState: {
      ...state.paymentIntentState,
      [action.context]: {
        ...state.paymentIntentState[action.context],
        id: action.id,
        clientSecret: action.clientSecret,
        amount: action.amount,
        currency: action.currency,
        error: null
      }
    }
  })),
  on(StripeActions.createPaymentIntentFailiure, (state, action) => ({
    ...state,
    paymentIntentState: {
      ...state.paymentIntentState,
      [action.context]: {
        ...state.paymentIntentState[action.context],
        error: action.error
      }
    }
  })),
  on(StripeActions.updatePaymentIntentSuccess, (state, action) => ({
    ...state,
    paymentIntentState: {
      ...state.paymentIntentState,
      [action.context]: {
        ...state.paymentIntentState[action.context],
        id: action.id,
        clientSecret: action.clientSecret,
        amount: action.amount,
        currency: action.currency,
        error: null
      }
    }
  })),
  on(StripeActions.updatePaymentIntentFailiure, (state, action) => ({
    ...state,
    paymentIntentState: {
      ...state.paymentIntentState,
      [action.context]: {
        ...state.paymentIntentState[action.context],
        error: action.error
      }
    }
  })),
  on(CoreActions.getFirestoreStateSuccess, (state, action) => {
    return action.state
      ? {
          ...state,
          ...action.state[featureKey]
        }
      : {
          ...state
        };
  }),
  on(AuthActions.logOutSuccess, () => initialState)
);
