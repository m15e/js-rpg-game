const sendScore = async (user, score) => {
  let res;
  try {
    const apiURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ykIVWSf8mzelJkl6Eb5b/scores';
    res = await fetch(apiURL, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
        score,
      }),
    });

    res = await res.json();
  } catch (err) {
    return err;
  }

  return res;
};

export default sendScore;