import * as fromAlert from '../reducers/alert.reducer';
import { selectState } from './alert.selectors';

describe('Alert Selectors', () => {
  it('should select the feature state', () => {
    const result = selectState({
      [fromAlert.featureKey]: {}
    });

    expect(result).toEqual({});
  });
});
