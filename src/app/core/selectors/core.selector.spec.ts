import { selectAdditionalState } from '@core/selectors/core.selector';
import { additionalKey } from '@core/reducers';

describe('Constraint Selectors', () => {
  it('should select the additional state', () => {
    const result = selectAdditionalState({
      [additionalKey]: {}
    });

    expect(result).toEqual({});
  });
});
