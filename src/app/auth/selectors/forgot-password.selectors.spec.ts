import * as fromForgotPassword from '../reducers/forgot-password.reducer';
import { selectForgotPasswordState } from './forgot-password.selectors';

describe('ForgotPassword Selectors', () => {
  it('should select the feature state', () => {
    const result = selectForgotPasswordState({
      [fromForgotPassword.forgotPasswordFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
