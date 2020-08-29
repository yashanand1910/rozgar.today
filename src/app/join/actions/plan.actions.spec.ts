import * as fromPlan from './plan.actions';

describe('loadPlans', () => {
  it('should return an action', () => {
    expect(fromPlan.loadPlans().type).toBe('[Plan] Load Plans');
  });
});
