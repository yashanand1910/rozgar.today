import * as fromCollection from './collection.actions';

describe('loadCollections', () => {
  it('should return an action', () => {
    expect(fromCollection.loadCollections().type).toBe('[Collection] Load Collections');
  });
});
