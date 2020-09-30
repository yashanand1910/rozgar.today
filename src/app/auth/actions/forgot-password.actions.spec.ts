import * as fromForgotPassword from './forgot-password.actions';

describe('forgotPassword', () => {
  it('should return an action', () => {
    expect(fromForgotPassword.forgotPassword.type).toBe('[ForgotPassword] Forgot Password');
  });
});
