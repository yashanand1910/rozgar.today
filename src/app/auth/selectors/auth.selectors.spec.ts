import { selectAuthState } from '@auth/selectors/auth.selectors';
import { authFeatureKey, AuthState, State } from '@auth/reducers';
import { MockState } from '@ngrx/store/testing';

describe('Auth Selectors', () => {
  it('should select the feature state', () => {
    const state = new MockState<State>().value;
    state[authFeatureKey] = new MockState<AuthState>().value;
    expect(selectAuthState(state)).toEqual({});
  });
});
