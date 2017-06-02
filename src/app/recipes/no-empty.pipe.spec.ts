import { NoEmptyPipe } from './no-empty.pipe';

describe('NoEmptyPipe', () => {
  it('create an instance', () => {
    const pipe = new NoEmptyPipe();
    expect(pipe).toBeTruthy();
  });
});
