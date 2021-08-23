import { selectState } from './collection.selectors';
import { Collection } from '@core/models';

describe('Collection Selectors', () => {
  it('should select the feature state for Plans', () => {
    const result = selectState(Collection.Plans)({
      [Collection.Plans]: {}
    });

    expect(result).toEqual({});
  });
});
