import * as fromSignup from '../reducers/signup.reducer';
import { selectAuthState } from '@auth/selectors/auth.selectors';
import { createSelector } from '@ngrx/store';

export const selectSignupState = createSelector(selectAuthState, (state) => state[fromSignup.signupFeatureKey]);

export const selectSignupIsLoading = createSelector(selectSignupState, (state) => state.isLoading);

export const selectSignupError = createSelector(selectSignupState, (state) => state.error);
