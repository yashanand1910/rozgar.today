import { MockState } from '@ngrx/store/testing';
import { authFeatureKey, AuthState, State } from '@auth/reducers';
import { signupFeatureKey, State as SignupState } from '@auth/reducers/signup.reducer';
import { selectSignupState } from '@auth/selectors/signup.selectors';

describe('Signup Selectors', () => {
  it('should select the feature state', () => {
    const state = new MockState<State>().value;
    const authState = (state[authFeatureKey] = new MockState<AuthState>().value);
    authState[signupFeatureKey] = new MockState<SignupState>().value;

    expect(selectSignupState(state)).toEqual({});
  });
});
