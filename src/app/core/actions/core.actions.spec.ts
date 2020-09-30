import * as fromCore from './core.actions';

describe('loadErrors', () => {
  it('should return an action', () => {
    expect(fromCore.networkError().type).toBe('[Core] Network Error');
  });
});
