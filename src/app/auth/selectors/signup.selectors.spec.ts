import { MockState } from '@ngrx/store/testing';
import { AuthState, featureKey as authFeatureKey, State } from '@auth/reducers';
import { featureKey, State as SignupState } from '@auth/reducers/signup.reducer';
import { selectState } from '@auth/selectors/signup.selectors';

describe('Signup Selectors', () => {
  it('should select the feature state', () => {
    const state = new MockState<State>().value;
    const authState = (state[authFeatureKey] = new MockState<AuthState>().value);
    authState[featureKey] = new MockState<SignupState>().value;

    expect(selectState(state)).toEqual({});
  });
});
