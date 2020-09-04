import * as fromSignup from './signup.actions';

describe('loadSignups', () => {
  it('should return an action', () => {
    expect(fromSignup.loadSignups().type).toBe('[Signup] Load Signups');
  });
});
