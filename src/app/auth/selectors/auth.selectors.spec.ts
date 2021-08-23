import { selectState } from '@auth/selectors/auth.selectors';
import { featureKey, AuthState, State } from '@auth/reducers';
import { MockState } from '@ngrx/store/testing';

describe('Auth Selectors', () => {
  it('should select the feature state', () => {
    const state = new MockState<State>().value;
    state[featureKey] = new MockState<AuthState>().value;
    expect(selectState(state)).toEqual({});
  });
});
