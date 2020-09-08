import * as fromResetPassword from '../reducers/reset-password.reducer';
import { selectResetPasswordState } from './reset-password.selectors';

describe('ResetPassword Selectors', () => {
  it('should select the feature state', () => {
    const result = selectResetPasswordState({
      [fromResetPassword.resetPasswordFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
