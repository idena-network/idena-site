import Twitter from 'twitter'
import {query as q} from 'faunadb'
import {serverClient} from '../../shared/utils/faunadb'

export default async (req, res) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })

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
    if (!error && data.length > 0) {
      if (data[0].followers_count < process.env.TWITTER_MINIMUM_SUBS_COUNT) {
        return res
          .status(400)
          .send('Your twitter account has too few subscribers')
      }
      if (
        Date.now() - Date.parse(data[0].created_at) <
        process.env.TWITTER_AGE_MILLIS
      ) {
        return res.status(400).send('Your twitter account is too new')
      }
      client.get(
        'search/tweets',
        {
          q: `from:${req.query.screen_name} @IdenaNetwork @gitcoin #IdenaTrustBonus -is:retweet`,
        },
        async function(error, tweets, tweetsResponse) {
          if (!error && tweets.statuses.length > 0) {
            if (
              Date.parse(previousEpochJson.result.validationTime) >
              Date.parse(tweets.statuses[0].created_at)
            ) {
              return res.status(400).send('Can not verify your tweet')
            }

            let codeResponse
            try {
              codeResponse = await getCode(
                req.query.screen_name,
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
      return res.status(400).send('Something went wrong')
    }
  })
}

async function getCode(name, epoch) {
  try {
    const {
      data: {invite},
    } = await serverClient.query(
      q.If(
        q.Exists(q.Match(q.Index('search_by_name_epoch'), name, epoch)),
        q.Abort('Invite is already given'),
        q.Let(
          {
            freeInvite: q.Match(q.Index('search_free_invite'), epoch, true),
          },
          q.If(
            q.IsEmpty(q.Var('freeInvite')),
            q.Abort('No invited left'),
            q.Update(q.Select('ref', q.Get(q.Var('freeInvite'))), {
              data: {name},
            })
          )
        )
      )
    )
    return invite
  } catch (e) {
    const errors = e.errors()
    if (errors.length) {
      throw new Error(errors[0].description)
    }
    throw new Error('Something went wrong')
  }
}
