import { selectLoginState } from './login.selectors';
import { MockState } from '@ngrx/store/testing';
import { authFeatureKey, AuthState, State } from '@auth/reducers';
import { loginFeatureKey, State as LoginState } from '@auth/reducers/login.reducer';

describe('Login Selectors', () => {
  it('should select the state', () => {
    const state = new MockState<State>().value;
    const authState = (state[authFeatureKey] = new MockState<AuthState>().value);
    authState[loginFeatureKey] = new MockState<LoginState>().value;

    expect(selectLoginState(state)).toEqual({});
  });
});
