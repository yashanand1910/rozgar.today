// noinspection DuplicatedCode

import { createSelector } from '@ngrx/store';
import * as fromResetPassword from '../reducers/reset-password.reducer';
import { selectState as selectAuthState } from './auth.selectors';

export const selectState = createSelector(selectAuthState, (state) => state[fromResetPassword.featureKey]);

export const selectIsVerifying = createSelector(selectState, (state) => state.isVerifying);

export const selectUser = createSelector(selectState, (state) => state.user);

export const selectCode = createSelector(selectState, (state) => state.code);

export const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

export const selectError = createSelector(selectState, (state) => state.error);
