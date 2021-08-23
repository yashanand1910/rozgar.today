import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';
import { additionalKey } from '@core/reducers';

export const selectState = createFeatureSelector<fromAuth.State, fromAuth.AuthState>(fromAuth.featureKey);

export const selectAdditionalState = createSelector(selectState, (state) => state[additionalKey]);

export const selectUser = createSelector(selectAdditionalState, (state) => state.user);

export const selectUserUid = createSelector(selectUser, (user) => user.uid);

export const selectIsLoading = createSelector(selectAdditionalState, (state) => state.isLoading);

export const selectIsLoaded = createSelector(selectAdditionalState, (state) => state.isLoaded);

export const selectError = createSelector(selectAdditionalState, (state) => state.error);

export const selectIsReloading = createSelector(selectAdditionalState, (state) => state.isReloading);
