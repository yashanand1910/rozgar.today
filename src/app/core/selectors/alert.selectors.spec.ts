import * as fromAlert from '../reducers/alert.reducer';
import { selectAlertState } from './alert.selectors';

describe('Alert Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAlertState({
      [fromAlert.alertFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
