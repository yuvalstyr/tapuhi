import auth0 from '../../lib/auth0'
import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: '/' })
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
