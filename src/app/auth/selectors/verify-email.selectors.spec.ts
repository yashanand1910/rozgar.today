import { selectVerifyEmailState } from './verify-email.selectors';
import { MockState } from '@ngrx/store/testing';
import { authFeatureKey, AuthState, State } from '@auth/reducers';
import { State as VerifyEmailState, verifyEmailFeatureKey } from '@auth/reducers/verify-email.reducer';

describe('VerifyEmail Selectors', () => {
  it('should select the state', () => {
    const state = new MockState<State>().value;
    const authState = (state[authFeatureKey] = new MockState<AuthState>().value);
    authState[verifyEmailFeatureKey] = new MockState<VerifyEmailState>().value;

    expect(selectVerifyEmailState(state)).toEqual({});
  });
});
