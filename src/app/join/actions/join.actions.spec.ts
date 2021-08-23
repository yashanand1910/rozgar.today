import * as fromJoin from './join.actions';

describe('nextStep', () => {
  it('should return an action', () => {
    expect(fromJoin.nextStep.type).toBe('[Join] Next Step');
  });
});
