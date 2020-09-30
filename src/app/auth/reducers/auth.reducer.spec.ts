import { additionalReducer, initialAdditionalState } from './auth.reducer';

describe('Auth Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = additionalReducer(initialAdditionalState, action);

      expect(result).toBe(initialAdditionalState);
    });
  });
});
