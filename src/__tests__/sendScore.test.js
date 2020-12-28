import sendScore from '../helpers/score';

describe('Test sendScore function', () => {
  it('is doesn\'t return null', () => {
    expect(sendScore()).resolves.not.toBeNull();
  });

  it('is expected to be defined', () => {
    expect(sendScore).toBeDefined();
  });


});