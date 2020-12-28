import getRanking from '../helpers/ranking';

describe('Test getRanking function', () => {
  it('is expected to be defined', () => {
    expect(getRanking).toBeDefined();
  });

  it('is doesn\'t return null', () => {
    expect(getRanking()).resolves.not.toBeNull();
  });



});