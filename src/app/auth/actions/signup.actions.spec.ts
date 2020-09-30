import * as fromSignup from './signup.actions';

describe('signUp', () => {
  it('should return an action', () => {
    expect(fromSignup.signUp.type).toBe('[Signup] Sign Up');
  });
});
