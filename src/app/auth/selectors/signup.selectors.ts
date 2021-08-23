import * as fromSignup from '../reducers/signup.reducer';
import { selectState as selectAuthState } from '@auth/selectors/auth.selectors';
import { createSelector } from '@ngrx/store';

export const selectState = createSelector(selectAuthState, (state) => state[fromSignup.featureKey]);

export const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

export const selectError = createSelector(selectState, (state) => state.error);
