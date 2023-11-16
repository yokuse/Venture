import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../../lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import type { User } from './user'
import logger from "../../../Logger";

export default withIronSessionApiRoute(logoutRoute, sessionOptions)

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  logger.info('User with email: ' + req.session.user?.email + ' logged out successfully')
  req.session.destroy()
  res.json({ isLoggedIn: false, email: '' })
}
