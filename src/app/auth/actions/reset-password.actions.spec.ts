import * as fromResetPassword from './reset-password.actions';

describe('resetPassword', () => {
  it('should return an action', () => {
    expect(fromResetPassword.resetPassword.type).toBe('[ResetPassword] Reset Password');
  });
});
