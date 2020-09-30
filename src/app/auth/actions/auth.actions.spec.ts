import * as fromAuth from './auth.actions';

describe('getUser', () => {
  it('should return an action', () => {
    expect(fromAuth.getUser.type).toBe('[Auth] Get User');
  });
});
