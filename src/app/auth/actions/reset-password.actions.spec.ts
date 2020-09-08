import * as fromResetPassword from './reset-password.actions';

describe('loadResetPasswords', () => {
  it('should return an action', () => {
    expect(fromResetPassword.loadResetPasswords().type).toBe('[ResetPassword] Load ResetPasswords');
  });
});
