import Twitter from 'twitter'

export default async (req, res) => {
  const ONE_MONTH = 1000 * 60 * 60 * 24 * 30
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })

  client.get(
    'search/tweets',
    {
      q: 'from:IdenaNetwork "idena" -is:retweet',
    },
    function(error, data, response) {
      if (!error) {
        console.log(data)
      } else {
        console.log(error)
      }
    }
  )
  return res.status(200).send('yeah')

  const currentEpoch = await fetch('https://api.idena.io/api/epoch/last')
  const currentEpochJson = await currentEpoch.json()
  const previousEpoch = await fetch(
    `https://api.idena.io/api/epoch/${currentEpochJson.result.epoch - 1}`
  )
  const previousEpochJson = await previousEpoch.json()
  if (!previousEpochJson.result) {
    return res.status(400).send('Something went wrong')
  }

  client.get('users/lookup', req.query, function(error, data, response) {
    if (!error && data.length > 0) {
      if (data[0].followers_count < 10) {
        return res
          .status(400)
          .send('Your twitter account has too few subscribers')
      }
      if (Date.now() - Date.parse(data[0].status.created_at) > ONE_MONTH) {
        return res.status(400).send('Your twitter account is too new')
      }
      client.get(
        'search/tweets',
        {
          q: `from:${req.query.screen_name} @IdenaNetwork @gitcoin #IdenaTrustBonus -is:retweet`,
        },
        function(error, tweets, tweetsResponse) {
          if (!error && tweets.length > 0) {
            if (
              Date.parse(previousEpochJson.result.validationTime) >
              Date.parse(tweets.statuses.created_at)
            ) {
              return res.status(400).send('Can not verify your tweet')
            }

            let codeResponse
            try {
              codeResponse = getCode(
                req.query.screen_name,
                previousEpochJson.result.epoch
              )
              return res.status(200).send(codeResponse)
            } catch (e) {
              return res.status(400).send(e.message)
            }
          }
          return res.status(400).send('Can not verify your tweet')
        }
      )
    } else {
      return res.status(400).send('Something went wrong')
    }
  })
}

async function getCode(name, epoch) {}
