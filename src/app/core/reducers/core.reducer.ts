import { ActionReducer, ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { environment } from '@env/environment';
import { Logger } from '@core/services';
import * as fromRouter from '@ngrx/router-store';
import * as fromConstraint from './constraint.reducer';
import * as fromAlert from './alert.reducer';
import * as fromCollection from './collection.reducer';
import * as fromStripe from './stripe.reducer';
import { CoreActions } from '../actions';
import { Collection } from '@core/models';
import { InjectionToken } from '@angular/core';
import { AuthActions } from '@auth/actions';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

// Every feature state will also have an 'additional' state for storing state for containers
export const additionalKey = 'additional';

export interface State {
  router: fromRouter.RouterReducerState;
  [fromConstraint.featureKey]: fromConstraint.State;
  [fromAlert.featureKey]: fromAlert.State;
  [fromStripe.featureKey]: fromStripe.State;
  [additionalKey]: AdditionalState;
}

export interface AdditionalState {
  isUpdated: boolean; // Is updated with Firestore state?
  isProcessing: boolean;
  error?: FirebaseError;
}

export const initialState: AdditionalState = {
  isUpdated: false,
  isProcessing: false
};

export const additionalReducer = createReducer(
  initialState,
  on(CoreActions.getFirestoreState, (state) => ({ ...state })),
  on(CoreActions.getFirestoreStateSuccess, (state, action) => {
    return action.state ? { ...state, error: null, isUpdated: true } : { ...state, error: null, isUpdated: false };
  }),
  on(CoreActions.getFirestoreStateFailure, (state, action) => ({ ...state, error: action.error })),
  on(CoreActions.setFirestoreState, (state) => ({ ...state, isProcessing: true })),
  on(CoreActions.setFirestoreStateSuccess, (state, action) => {
    return action.firstTime
      ? { ...state, isProcessing: false, error: null, isUpdated: true }
      : { ...state, isProcessing: false, error: null };
  }),
  on(CoreActions.setFirestoreStateFailure, (state, action) => ({ ...state, error: action.error })),
  on(AuthActions.logOutSuccess, (state) => ({ ...state, isUpdated: false }))
);

export const reducers = new InjectionToken<ActionReducerMap<State>>('Root reducers token', {
  factory: () => {
    const coreReducers: ActionReducerMap<State> = {
      router: fromRouter.routerReducer,
      [fromConstraint.featureKey]: fromConstraint.reducer,
      [fromAlert.featureKey]: fromAlert.reducer,
      [fromStripe.featureKey]: fromStripe.reducer,
      [additionalKey]: additionalReducer
    };

    // Add collection reducer as well, but since it is dynamic...
    for (const key in Collection) {
      coreReducers[Collection[key]] = fromCollection.reducer(Collection[key]);
    }
    return coreReducers as ActionReducerMap<State>;
  }
});

/*******************
 * Meta-reducers
 *******************/

const log = new Logger('Action');

/**
 * Log every action for debugging / error or warn actions for more info
 *
 * @param {ActionReducer<State>} reducer
 * @returns {ActionReducer<State>}
 */
export function actionLogger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const newState = reducer(state, action);
    if (action.type.startsWith('@ngrx/router')) {
      log.debug(`${action.type} (url: ${action['payload'].event.url})`);
    } else if (action['error']) {
      log.error(`${action.type} (error: ${action['error']['code']})`, {
        action: action,
        oldState: state,
        newState
      });
    } else if (action['warn']) {
      log.warn(`${action.type} (warn: ${action['warn']})`, {
        action: action,
        oldState: state,
        newState
      });
    } else {
      log.info(action.type, {
        action: action,
        oldState: state,
        newState
      });
    }

    return newState;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [actionLogger] : [];
