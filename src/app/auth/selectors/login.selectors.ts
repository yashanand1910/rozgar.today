import { createSelector } from '@ngrx/store';
import * as fromLogin from '../reducers/login.reducer';
import { selectAuthState } from '@auth/selectors/auth.selectors';

export const selectLoginState = createSelector(selectAuthState, (state) => state[fromLogin.loginFeatureKey]);

export const selectLoginIsLoading = createSelector(selectLoginState, (state) => state.isLoading);

export const selectLoginError = createSelector(selectLoginState, (state) => state.error);
