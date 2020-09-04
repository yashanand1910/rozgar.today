import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State, fromAuth.AuthState>(fromAuth.authFeatureKey);

export const selectUser = createSelector(selectAuthState, (state) => state[fromAuth.additionalKey].user);

export const selectIsLoading = createSelector(selectAuthState, (state) => state[fromAuth.additionalKey].isLoading);

export const selectError = createSelector(selectAuthState, (state) => state[fromAuth.additionalKey].error);
