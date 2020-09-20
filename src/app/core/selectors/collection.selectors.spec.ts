import * as fromCollection from '../reducers/collection.reducer';
import { selectCollectionState } from './collection.selectors';

describe('Collection Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCollectionState({
      [fromCollection.collectionFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
