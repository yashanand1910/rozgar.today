import { CreateReferencePipe } from './create-reference.pipe';

describe('CreateReferencePipe', () => {
  it('create an instance', () => {
    const pipe = new CreateReferencePipe();
    expect(pipe).toBeTruthy();
  });
});
