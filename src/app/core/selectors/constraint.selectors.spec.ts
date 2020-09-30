import * as fromConstraint from '../reducers/constraint.reducer';
import { selectConstraintState } from './constraint.selectors';

describe('Constraint Selectors', () => {
  it('should select the feature state', () => {
    const result = selectConstraintState({
      [fromConstraint.constraintFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
