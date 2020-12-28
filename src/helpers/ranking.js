const getRanking = async () => {
  const apiURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ykIVWSf8mzelJkl6Eb5b/scores';
  try {
    let res = await fetch(apiURL, {
      mode: 'cors',
    });
    res = await res.json();
    return res;
  } catch {
    throw new Error('API score fetch failed');
  }
};

export default getRanking;