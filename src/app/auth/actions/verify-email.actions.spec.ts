import * as fromVerifyEmail from './verify-email.actions';

describe('verifyEmail', () => {
  it('should return an action', () => {
    expect(fromVerifyEmail.verifyEmail.type).toBe('[VerifyEmail] Verify Email');
  });
});
