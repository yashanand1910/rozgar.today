import * as fromForgotPassword from './forgot-password.actions';

describe('loadForgotPasswords', () => {
  it('should return an action', () => {
    expect(fromForgotPassword.loadForgotPasswords().type).toBe('[ForgotPassword] Load ForgotPasswords');
  });
});
