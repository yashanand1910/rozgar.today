import * as fromVerifyEmail from '../reducers/verify-email.reducer';
import { selectVerifyEmailState } from './verify-email.selectors';

describe('VerifyEmail Selectors', () => {
  it('should select the feature state', () => {
    const result = selectVerifyEmailState({
      [fromVerifyEmail.verifyEmailFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
