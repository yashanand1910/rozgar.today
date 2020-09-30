import { selectForgotPasswordState } from './forgot-password.selectors';
import { MockState } from '@ngrx/store/testing';
import { authFeatureKey, AuthState, State } from '@auth/reducers';
import { forgotPasswordFeatureKey, State as ForgotPasswordState } from '@auth/reducers/forgot-password.reducer';

describe('ForgotPassword Selectors', () => {
  it('should select the state', () => {
    const state = new MockState<State>().value;
    const authState = (state[authFeatureKey] = new MockState<AuthState>().value);
    authState[forgotPasswordFeatureKey] = new MockState<ForgotPasswordState>().value;

    expect(selectForgotPasswordState(state)).toEqual({});
  });
});
