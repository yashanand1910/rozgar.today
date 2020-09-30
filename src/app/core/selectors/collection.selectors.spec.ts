import { selectCollectionState } from './collection.selectors';
import { Collection } from '@core/models';

describe('Collection Selectors', () => {
  it('should select the feature state for Plans', () => {
    const result = selectCollectionState(Collection.Plans)({
      [Collection.Plans]: {}
    });

    expect(result).toEqual({});
  });
});
