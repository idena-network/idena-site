import {query as q} from 'faunadb'
import {getIdentity, getTxs, searchInvite} from '../api'
import {serverClient} from './faunadb'

async function hasPreviousInvites(name) {
  try {
    const {data} = await serverClient.query(
      q.Let(
        {
          prev: q.Match(q.Index('invites_by_name_sort_by_epoch_desc'), name),
        },
        q.If(
          q.IsEmpty(q.Var('prev')),
          {data: []},
          q.Map(
            q.Paginate(q.Var('prev'), {size: 1}),
            q.Lambda(
              ['epoch', 'ref'],
              q.Select(['data', 'invite'], q.Get(q.Var('ref')))
            )
          )
        )
      )
    )

    // we have previous invites, check the last one
    if (data.length) {
      try {
        const prevInvite = data[0]

        const searchResult = await searchInvite(prevInvite)
        const address = searchResult[0].value

        const txs = await getTxs(address)

        const activationTx = txs.filter(x => x.type === 'ActivationTx')

        if (!activationTx.length) return

        const toAddr = activationTx[0].to

        const identity = await getIdentity(toAddr)

        if (identity.state !== 'Undefined') {
          return true
        }
      } catch {
        return false
      }
    }
  } catch (e) {
    throw new Error('Something went wrong')
  }
  return false
}

export async function getInvitationCode(name, screenName, epoch, refId) {
  if (await hasPreviousInvites(name)) {
    throw new Error('You can not get multiple invitation codes')
  }

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
