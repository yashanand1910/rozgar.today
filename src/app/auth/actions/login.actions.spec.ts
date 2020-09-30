import * as fromLogin from './login.actions';

describe('logIn', () => {
  it('should return an action', () => {
    expect(fromLogin.logIn.type).toBe('[Login] Log In');
  });
});
