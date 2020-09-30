import { selectResetPasswordState } from './reset-password.selectors';
import { MockState } from '@ngrx/store/testing';
import { authFeatureKey, AuthState, State } from '@auth/reducers';
import { resetPasswordFeatureKey, State as ResetPasswordState } from '@auth/reducers/reset-password.reducer';

describe('ResetPassword Selectors', () => {
  it('should select the state', () => {
    const state = new MockState<State>().value;
    const authState = (state[authFeatureKey] = new MockState<AuthState>().value);
    authState[resetPasswordFeatureKey] = new MockState<ResetPasswordState>().value;

    expect(selectResetPasswordState(state)).toEqual({});
  });
});
