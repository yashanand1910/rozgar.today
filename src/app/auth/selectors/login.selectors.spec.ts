import { selectState } from './login.selectors';
import { MockState } from '@ngrx/store/testing';
import { featureKey as authFeatureKey, AuthState, State } from '@auth/reducers';
import { featureKey, State as LoginState } from '@auth/reducers/login.reducer';

describe('Login Selectors', () => {
  it('should select the state', () => {
    const state = new MockState<State>().value;
    const authState = (state[authFeatureKey] = new MockState<AuthState>().value);
    authState[featureKey] = new MockState<LoginState>().value;

    expect(selectState(state)).toEqual({});
  });
});
