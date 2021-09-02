// noinspection DuplicatedCode

import { createSelector } from '@ngrx/store';
import * as fromVerifyEmail from '../reducers/verify-email.reducer';
import { selectState as selectAuthState } from './auth.selectors';

export const selectState = createSelector(selectAuthState, (state) => state[fromVerifyEmail.featureKey]);

export const selectIsVerifying = createSelector(selectState, (state) => state.isVerifying);

export const selectError = createSelector(selectState, (state) => state.error);

export const selectSuccess = createSelector(selectState, (state) => state.success);

export const selectCode = createSelector(selectState, (state) => state.code);

export const selectIsLoading = createSelector(selectState, (state) => state.isLoading);
