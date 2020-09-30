import * as fromCollection from './collection.actions';

describe('loadCollection', () => {
  it('should return an action', () => {
    expect(fromCollection.loadCollection.type).toBe('[Collection] Load Collection');
  });
});
