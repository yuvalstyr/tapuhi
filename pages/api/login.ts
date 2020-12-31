import auth0 from '../../lib/auth0'
import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    await auth0.handleLogin(req, res)
  } catch (error) {
    res.status(error.status || 500).end(error.message)
  }
}
