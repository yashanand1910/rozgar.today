import * as fromConstraint from '../reducers/constraint.reducer';
import { selectState } from './constraint.selectors';

describe('Constraint Selectors', () => {
  it('should select the feature state', () => {
    const result = selectState({
      [fromConstraint.featureKey]: {}
    });

    expect(result).toEqual({});
  });
});
