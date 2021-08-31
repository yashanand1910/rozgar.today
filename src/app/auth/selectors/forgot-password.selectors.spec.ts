import { selectState } from './forgot-password.selectors';
import { MockState } from '@ngrx/store/testing';
import { AuthState, featureKey as authFeatureKey, State } from '@auth/reducers';
import { featureKey, State as ForgotPasswordState } from '@auth/reducers/forgot-password.reducer';

describe('ForgotPassword Selectors', () => {
  it('should select the state', () => {
    const state = new MockState<State>().value;
    const authState = (state[authFeatureKey] = new MockState<AuthState>().value);
    authState[featureKey] = new MockState<ForgotPasswordState>().value;

    expect(selectState(state)).toEqual({});
  });
});
