import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOption from '../reducers/option.reducer';
import { FirestoreCollection } from '@core/models';

export const selectOptionState = createFeatureSelector<fromOption.State>(fromOption.optionFeatureKey);

export const selectOption = createSelector(
  selectOptionState,
  (state: fromOption.State, props: { collection: FirestoreCollection }) => state[props.collection]
);

export const selectOptionError = createSelector(
  selectOptionState,
  (state: fromOption.State, props: { collection: FirestoreCollection }) => state[props.collection].error
);
