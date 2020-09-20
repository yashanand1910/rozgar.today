import * as fromConstraint from './constraint.actions';

describe('loadConstraints', () => {
  it('should return an action', () => {
    expect(fromConstraint.loadConstraints().type).toBe('[Constraint] Load Constraints');
  });
});
