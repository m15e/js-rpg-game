import sendScore from '../helpers/score';
import axios from 'axios';

jest.mock('axios');

describe('Test sendScore function', () => {
  it('is doesn\'t return null', () => {
    expect(sendScore()).resolves.not.toBeNull();
  });

  it('is expected to be defined', () => {
    expect(sendScore).toBeDefined();
  });

  it('API result is posted', async () => {
    axios.post.mockResolvedValue(
      {
        data:
          { result: 'Leaderboard score created correctly.' },
      },
    );
    const res = await sendScore('player', 10);
    expect(res.result).toEqual('Leaderboard score created correctly.');
  });

  it('does not post faulty input like strings for scores', async () => {
    axios.post.mockResolvedValue(
      {
        data:
          { message: 'You need to provide a valid score for the leaderboard' },
      },
    );
    const res = await sendScore('test', 'hello');
    expect(res.message).toEqual('You need to provide a valid score for the leaderboard');
  });


});