import * as fromJoin from './join.actions';

describe('loadJoins', () => {
  it('should return an action', () => {
    expect(fromJoin.loadJoins().type).toBe('[Join] Load Joins');
  });
});
