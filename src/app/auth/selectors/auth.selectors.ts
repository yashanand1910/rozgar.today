import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State, fromAuth.AuthState>(fromAuth.authFeatureKey);

export const selectAuthAdditionalState = createSelector(selectAuthState, (state) => state[fromAuth.additionalKey]);

export const selectAuthUser = createSelector(selectAuthAdditionalState, (state) => state.user);

export const selectAuthIsLoading = createSelector(selectAuthAdditionalState, (state) => state.isLoading);

export const selectAuthError = createSelector(selectAuthAdditionalState, (state) => state.error);
