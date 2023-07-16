import Twitter from 'twitter'
import {getInvitationCode} from '../../shared/utils/get-invitation'

export default async (req, res) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })

  const ONE_YEAR = 1000 * 60 * 60 * 24 * 365
  const minTwitterSubs =
    process.env.NEXT_PUBLIC_TWITTER_MINIMUM_SUBS_COUNT || 100
  const minTwitterAge = process.env.TWITTER_AGE_MILLIS || 2592000000
  const currentEpoch = await fetch('https://api.idena.io/api/epoch/last')
  const currentEpochJson = await currentEpoch.json()
  const previousEpoch = await fetch(
    `https://api.idena.io/api/epoch/${currentEpochJson.result.epoch - 1}`
  )
  const previousEpochJson = await previousEpoch.json()
  if (!previousEpochJson.result) {
    return res.status(400).send('Something went wrong')
  }

  client.get('users/lookup', req.query, async function(error, data, response) {
    if (data.errors && data.errors[0].code === 17) {
      return res.status(400).send('Can not find the Twitter account')
    }
    if (!error && data.length > 0) {
      if (
        data[0].followers_count < minTwitterSubs ||
        Date.now() - Date.parse(data[0].created_at) < minTwitterAge
      ) {
        return res
          .status(400)
          .send('Your twitter account is too new or has too few subscribers')
      }
      client.get(
        'search/tweets',
        {
          q: `from:${req.query.screen_name} @IdenaNetwork @gitcoin #IdenaTrustBonus -is:retweet`,
        },
        async function(error, tweets) {
          if (!error && tweets.statuses.length > 0) {
            if (
              Date.parse(previousEpochJson.result.validationTime) >
              Date.parse(tweets.statuses[0].created_at)
            ) {
              return res.status(400).send('Can not verify your tweet')
            }

            let codeResponse
            try {
              codeResponse = await getInvitationCode(
                data[0].id_str,
                data[0].screen_name,
                currentEpochJson.result.epoch
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
      return res
        .status(400)
        .send(
          'Twitter API is unavailable. Please use Telegram or Discord to get an invite code.'
        )
    }
  })
}
