import { initialState, reducer } from './collection.reducer';
import { Collection } from '@core/models';

describe('Collection Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(Collection.Plans)(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
