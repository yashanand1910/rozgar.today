import { selectState } from './verify-email.selectors';
import { MockState } from '@ngrx/store/testing';
import { AuthState, featureKey as authFeatureKey, State } from '@auth/reducers';
import { featureKey, State as VerifyEmailState } from '@auth/reducers/verify-email.reducer';

describe('VerifyEmail Selectors', () => {
  it('should select the state', () => {
    const state = new MockState<State>().value;
    const authState = (state[authFeatureKey] = new MockState<AuthState>().value);
    authState[featureKey] = new MockState<VerifyEmailState>().value;

    expect(selectState(state)).toEqual({});
  });
});
