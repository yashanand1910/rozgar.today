import { createSelector } from '@ngrx/store';
import * as fromLogin from '../reducers/login.reducer';
import { selectState as selectAuthState } from '@auth/selectors/auth.selectors';

export const selectState = createSelector(selectAuthState, (state) => state[fromLogin.featureKey]);

export const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

export const selectError = createSelector(selectState, (state) => state.error);
