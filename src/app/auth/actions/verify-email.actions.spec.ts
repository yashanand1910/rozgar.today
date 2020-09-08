import * as fromVerifyEmail from './verify-email.actions';

describe('loadVerifyEmails', () => {
  it('should return an action', () => {
    expect(fromVerifyEmail.loadVerifyEmails().type).toBe('[VerifyEmail] Load VerifyEmails');
  });
});
