import { selectState } from './reset-password.selectors';
import { MockState } from '@ngrx/store/testing';
import { AuthState, featureKey as authFeatureKey, State } from '@auth/reducers';
import { featureKey, State as ResetPasswordState } from '@auth/reducers/reset-password.reducer';

describe('ResetPassword Selectors', () => {
  it('should select the state', () => {
    const state = new MockState<State>().value;
    const authState = (state[authFeatureKey] = new MockState<AuthState>().value);
    authState[featureKey] = new MockState<ResetPasswordState>().value;

    expect(selectState(state)).toEqual({});
  });
});
