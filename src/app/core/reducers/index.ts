import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@env/environment';
import { Logger } from '@core/services';
import * as fromRouter from '@ngrx/router-store';
import * as fromOption from './option.reducer';

export interface State {
  router: fromRouter.RouterReducerState<any>;
  [fromOption.optionFeatureKey]: fromOption.State;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  [fromOption.optionFeatureKey]: fromOption.reducer
};

const log = new Logger('Action');

// Debug logger for each action
export function actionLogger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const newState = reducer(state, action);
    log.debug(action.type, {
      payload: (action as any).payload,
      oldState: state,
      newState
    });
    return newState;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [actionLogger] : [];
