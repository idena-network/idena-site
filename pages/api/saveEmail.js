import {query as q} from 'faunadb'
import {serverClient} from '../../shared/utils/faunadb'

export default async (req, res) => {
  const {email} = req.body
  if (!email) {
    return res.status(400).send('bad request')
  }
  try {
    await serverClient.query(
      q.Create(q.Collection('emails'), {
        data: {email},
      })
    )
    return res.status(200).end()
  } catch (e) {
    return res.status(400).send('failed to write an email')
  }
}
