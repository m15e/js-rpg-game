import axios from 'axios';

const sendScore = async (user, score) => {
  user = user.toString();
  const response = await axios.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ykIVWSf8mzelJkl6Eb5b/scores', { user, score })
    .then(res => res.data)
    .catch(err => err.response.data);
  return response;
};

export default sendScore;