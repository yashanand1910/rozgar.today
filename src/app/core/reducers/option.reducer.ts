import { createReducer, on } from '@ngrx/store';
import * as OptionActions from '../actions/option.actions';
import { Country } from '@core/models';

export const optionFeatureKey = 'option';

export interface State {
  countries: {
    isLoading: boolean;
    error: string;
    options: Country[];
  };
}

export const initialState: State = {
  countries: null
};

export const reducer = createReducer(
  initialState,

  on(OptionActions.loadOption, (state, action) => {
    return {
      ...state,
      [action.collection]: {
        ...state[action.collection],
        isLoading: true
      }
    };
  }),
  on(OptionActions.loadOptionSuccess, (state, action) => {
    return {
      ...state,
      [action.collection]: {
        ...state[action.collection],
        options: action.options,
        isLoading: false,
        error: null
      }
    };
  }),
  on(OptionActions.loadOptionFailed, (state, action) => {
    return {
      ...state,
      [action.collection]: {
        ...state[action.collection],
        isLoading: false,
        error: action.error.message
      }
    };
  })
);
