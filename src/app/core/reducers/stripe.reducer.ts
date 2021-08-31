import { createReducer, on } from '@ngrx/store';
import { CoreActions, StripeActions } from '../actions';
import { AuthActions } from '@auth/actions';
import { PaymentIntent } from '@core/models';
import firebase from 'firebase/compat/app';
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
  isLoading: boolean;
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
        isLoading: true,
        ...state.paymentIntentState[action.context],
        products: action.products
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
        isLoading: false,
        error: null
      }
    }
  })),
  on(StripeActions.createPaymentIntentFailure, (state, action) => ({
    ...state,
    paymentIntentState: {
      ...state.paymentIntentState,
      [action.context]: {
        ...state.paymentIntentState[action.context],
        error: action.error
      }
    }
  })),
  on(StripeActions.updatePaymentIntent, (state, action) => ({
    ...state,
    paymentIntentState: {
      ...state.paymentIntentState,
      [action.context]: {
        ...state.paymentIntentState[action.context],
        products: action.products,
        isLoading: true
      }
    }
  })),
  on(StripeActions.updatePaymentIntentSuccess, (state, action) => ({
    ...state,
    paymentIntentState: {
      ...state.paymentIntentState,
      [action.context]: {
        ...state.paymentIntentState[action.context],
        clientSecret: action.clientSecret,
        amount: action.amount,
        currency: action.currency,
        isLoading: false,
        error: null
      }
    }
  })),
  on(StripeActions.updatePaymentIntentFailure, (state, action) => ({
    ...state,
    paymentIntentState: {
      ...state.paymentIntentState,
      [action.context]: {
        ...state.paymentIntentState[action.context],
        error: action.error
      }
    }
  })),
  on(StripeActions.loadPaymentIntent, (state, action) => ({
    ...state,
    paymentIntentState: {
      ...state.paymentIntentState,
      [action.context]: {
        ...state.paymentIntentState[action.context],
        isLoading: true
      }
    }
  })),
  on(StripeActions.loadPaymentIntentSuccess, (state, action) => ({
    ...state,
    paymentIntentState: {
      ...state.paymentIntentState,
      [action.context]: {
        ...state.paymentIntentState[action.context],
        clientSecret: action.clientSecret,
        amount: action.amount,
        currency: action.currency,
        isLoading: false,
        error: null
      }
    }
  })),
  on(StripeActions.loadPaymentIntentFailure, (state, action) => ({
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
