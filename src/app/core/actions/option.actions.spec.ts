import * as fromOption from './option.actions';

describe('loadOptions', () => {
  it('should return an action', () => {
    expect(fromOption.loadOptions().type).toBe('[Option] Load Options');
  });
});
