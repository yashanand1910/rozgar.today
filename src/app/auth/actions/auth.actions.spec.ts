import * as fromAuth from './auth.actions';

describe('loadAuth', () => {
  it('should return an action', () => {
    expect(fromAuth.loadAuth.type).toBe('[Auth] Load Auth');
  });
});
