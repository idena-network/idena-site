/* eslint-disable prefer-const */
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

  const ONE_YEAR = 1000 * 60 * 60 * 24 * 365
  const minTwitterSubs = process.env.TWITTER_MINIMUM_SUBS_COUNT || 10
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
  let userResponse
  let tweetResponse
  let codeResponse

  try {
    userResponse = await client.get('users/lookup', {
      screen_name: req.query.screen_name,
    })
  } catch (e) {
    return res.status(400).send('Something went wrong')
  }

  if (userResponse?.errors?.[0]?.code === 17) {
    return res.status(400).send('Can not find the Twitter account')
  }
  if (!userResponse.length) {
    return res.status(400).send('Something went wrong')
  }

  const user = userResponse[0]
  if (
    user.followers_count < minTwitterSubs &&
    Date.now() - Date.parse(user.created_at) < minTwitterAge
  ) {
    return res.status(400).send('Your twitter account has too few subscribers')
  }
  if (Date.now() - Date.parse(user.created_at) < ONE_YEAR) {
    return res.status(400).send('Your twitter account is too new')
  }

  if (user.status?.text) {
    const {text} = user.status
    if (
      text.includes('@IdenaNetwork') &&
      text.includes('#IdenaInvite') &&
      Date.parse(previousEpochJson.result.validationTime) <
        Date.parse(user.status.created_at)
    ) {
      try {
        codeResponse = await getCode(
          user.id_str,
          user.screen_name,
          currentEpochJson.result.epoch,
          req.query.refId ? req.query.refId : null
        )
        return res.status(200).send(codeResponse)
      } catch (e) {
        return res.status(400).send(e.message)
      }
    }
  }

  try {
    tweetResponse = await client.get('search/tweets', {
      q: `from:${req.query.screen_name} @IdenaNetwork #IdenaInvite -is:retweet`,
    })
  } catch (e) {
    return res.status(400).send('Can not verify your tweet')
  }

  if (
    !tweetResponse?.statuses?.length ||
    Date.parse(previousEpochJson.result.validationTime) >
      Date.parse(tweetResponse?.statuses[0]?.created_at)
  ) {
    return res.status(400).send('Can not verify your tweet')
  }

  try {
    codeResponse = await getCode(
      user.id_str,
      user.screen_name,
      currentEpochJson.result.epoch,
      req.query.refId ? req.query.refId : null
    )
    return res.status(200).send(codeResponse)
  } catch (e) {
    return res.status(400).send(e.message)
  }
}

async function getCode(name, screenName, epoch, refId) {
  try {
    const {
      data: {invite},
    } = await serverClient.query(
      q.If(
        q.Exists(q.Match(q.Index('search_by_name_epoch'), name, epoch)),
        q.Abort('Invitation code was already given to the twitter account'),
        q.Let(
          {
            freeInvite: q.Match(q.Index('search_free_invite'), epoch, true),
          },
          q.If(
            q.IsEmpty(q.Var('freeInvite')),
            q.Abort(
              'There are no invitation codes available, please try again later'
            ),
            q.Update(q.Select('ref', q.Get(q.Var('freeInvite'))), {
              data: {name, screenName, refId},
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
