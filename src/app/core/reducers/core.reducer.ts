import { ActionReducer, ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { environment } from '@env/environment';
import { Logger } from '@core/services';
import * as fromRouter from '@ngrx/router-store';
import * as fromConstraint from './constraint.reducer';
import * as fromAlert from './alert.reducer';
import * as fromCollection from './collection.reducer';
import * as fromStripe from './stripe.reducer';
import * as CoreActions from '../actions';
import { Collection } from '@core/models';
import { InjectionToken } from '@angular/core';

// Every feature state will also have an 'additional' state for storing state for containers
export const additionalKey = 'additional';

export interface State {
  router: fromRouter.RouterReducerState;
  [fromConstraint.constraintFeatureKey]: fromConstraint.State;
  [fromAlert.alertFeatureKey]: fromAlert.State;
  [fromStripe.stripeFeatureKey]: fromStripe.State;
  [additionalKey]: AdditionalState;
}

export interface AdditionalState {
  error: string;
}

export const initialState: AdditionalState = {
  error: null
};

export const additionalReducer = createReducer(
  initialState,
  on(CoreActions.networkError, (state) => ({ ...state, error: 'Network error, please reload.' }))
);

export const reducers = new InjectionToken<ActionReducerMap<State>>('Root reducers token', {
  factory: () => {
    const coreReducers: ActionReducerMap<State> = {
      router: fromRouter.routerReducer,
      [fromConstraint.constraintFeatureKey]: fromConstraint.reducer,
      [fromAlert.alertFeatureKey]: fromAlert.reducer,
      [fromStripe.stripeFeatureKey]: fromStripe.reducer,
      [additionalKey]: additionalReducer
    };

    // Add collection reducer as well, but since it is dynamic...
    for (const key in Collection) {
      coreReducers[Collection[key]] = fromCollection.reducer(Collection[key]);
    }
    return coreReducers as ActionReducerMap<State>;
  }
});

const log = new Logger('Action');

/*******************
 * Meta-reducers
 *******************/

/**
 * Log every action for debugging / error or warn actions for more info
 *
 * @param {ActionReducer<State>} reducer
 * @returns {ActionReducer<State>}
 */
export function actionLogger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const newState = reducer(state, action);
    if (action['error']) {
      log.error(`${action.type} (error: ${action['error']})`, {
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
      log.debug(action.type, {
        action: action,
        oldState: state,
        newState
      });
    }

    return newState;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [actionLogger] : [];
