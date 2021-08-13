import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';
import { additionalKey } from '@core/reducers';

export const selectAuthState = createFeatureSelector<fromAuth.State, fromAuth.AuthState>(fromAuth.authFeatureKey);

export const selectAuthAdditionalState = createSelector(selectAuthState, (state) => state[additionalKey]);

export const selectAuthUser = createSelector(selectAuthAdditionalState, (state) => state.user);

export const selectAuthUserUid = createSelector(selectAuthUser, (user) => user.uid);

export const selectAuthIsLoading = createSelector(selectAuthAdditionalState, (state) => state.isLoading);

export const selectAuthIsInitialized = createSelector(selectAuthAdditionalState, (state) => state.isInitialized);

export const selectAuthError = createSelector(selectAuthAdditionalState, (state) => state.error);

export const selectAuthIsReloading = createSelector(selectAuthAdditionalState, (state) => state.isReloading);
