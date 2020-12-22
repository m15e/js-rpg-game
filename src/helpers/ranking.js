const getRanking = async () => {
  let apiURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/tB4vCeH1M2zdNORMm4cr/scores'
  try {
    let res = await fetch(apiURL)
    res = await res.json()
    return res
  } catch {
    throw new Error('API score fetch failed')
  }
}

export default getRanking;