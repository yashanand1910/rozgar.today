import { additionalReducer, initialState } from '@core/reducers/core.reducer';

describe('Constraint Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = additionalReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
