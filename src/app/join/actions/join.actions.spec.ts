import * as fromJoin from './join.actions';

describe('nextJoinStep', () => {
  it('should return an action', () => {
    expect(fromJoin.nextJoinStep.type).toBe('[Join] Next Step');
  });
});
