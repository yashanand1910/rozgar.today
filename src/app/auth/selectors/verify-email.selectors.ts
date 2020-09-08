import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromVerifyEmail from '../reducers/verify-email.reducer';
import { selectAuthState } from '@auth/selectors/auth.selectors';

export const selectVerifyEmailState = createSelector(
  selectAuthState,
  (state) => state[fromVerifyEmail.verifyEmailFeatureKey]
);

export const selectVerifyEmailIsVerifying = createSelector(selectVerifyEmailState, (state) => state.isVerifying);

export const selectVerifyEmailError = createSelector(selectVerifyEmailState, (state) => state.error);

export const selectVerifyEmailSuccess = createSelector(selectVerifyEmailState, (state) => state.success);

export const selectVerifyEmailCode = createSelector(selectVerifyEmailState, (state) => state.code);

export const selectVerifyEmailIsLoading = createSelector(selectVerifyEmailState, (state) => state.isLoading);
