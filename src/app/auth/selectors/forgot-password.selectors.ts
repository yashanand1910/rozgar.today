import { createSelector } from '@ngrx/store';
import * as fromForgotPassword from '../reducers/forgot-password.reducer';
import { selectAuthState } from '@auth/selectors/auth.selectors';

export const selectForgotPasswordState = createSelector(
  selectAuthState,
  (state) => state[fromForgotPassword.forgotPasswordFeatureKey]
);

export const selectForgotPasswordIsLoading = createSelector(selectForgotPasswordState, (state) => state.isLoading);

export const selectForgotPasswordInfo = createSelector(selectForgotPasswordState, (state) => state.info);

export const selectForgotPasswordError = createSelector(selectForgotPasswordState, (state) => state.error);
