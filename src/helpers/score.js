const sendScore = async (user, score) => {
  let res;
  try {
    const apiURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ykIVWSf8mzelJkl6Eb5b/scores';
    console.log(user, score, apiURL)
    res = await fetch(apiURL, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: user,
        score
      }),
    });

    res = await res.json();
    res = await res.result;
  } catch {
    throw new Error('Failed to submit data to API');
  }

  return res
};

export default sendScore;