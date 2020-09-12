import { createSelector } from '@ngrx/store';
import * as fromResetPassword from '../reducers/reset-password.reducer';
import { selectAuthState } from '@auth/selectors/auth.selectors';

export const selectResetPasswordState = createSelector(
  selectAuthState,
  (state) => state[fromResetPassword.resetPasswordFeatureKey]
);

export const selectResetPasswordIsVerifying = createSelector(selectResetPasswordState, (state) => state.isVerifying);

export const selectResetPasswordUser = createSelector(selectResetPasswordState, (state) => state.user);

export const selectResetPasswordCode = createSelector(selectResetPasswordState, (state) => state.code);

export const selectResetPasswordIsLoading = createSelector(selectResetPasswordState, (state) => state.isLoading);

export const selectResetPasswordError = createSelector(selectResetPasswordState, (state) => state.error);
