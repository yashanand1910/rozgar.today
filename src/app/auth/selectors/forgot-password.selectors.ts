import { createSelector } from '@ngrx/store';
import * as fromForgotPassword from '../reducers/forgot-password.reducer';
import { selectState as selectAuthState } from '@auth/selectors/auth.selectors';

export const selectState = createSelector(
  selectAuthState,
  (state) => state[fromForgotPassword.featureKey]
);

export const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

export const selectInfo = createSelector(selectState, (state) => state.info);

export const selectError = createSelector(selectState, (state) => state.error);
