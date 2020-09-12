import * as fromOption from '../reducers/option.reducer';
import { selectOptionState } from './option.selectors';

describe('Option Selectors', () => {
  it('should select the feature state', () => {
    const result = selectOptionState({
      [fromOption.optionFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
