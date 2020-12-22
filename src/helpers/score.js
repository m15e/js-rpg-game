const sendScore = async (user, score) => {
  try {
    const data = { user, score };
    const apiURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/tB4vCeH1M2zdNORMm4cr/scores';
    await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error('API send score error');
  }
};

export default sendScore;