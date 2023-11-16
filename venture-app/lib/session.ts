// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions} from 'iron-session'
import { withIronSessionSsr } from "iron-session/next";
import type { User } from '../pages/api/auth/user'

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'iron-session',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    httpOnly: true,
    sameSite: "strict",
    maxAge:  60*30 , //expire after 30 mins
    secure: process.env.NODE_ENV === 'production',

  },
}

export function withSessionSSR(handler : any) {
  return withIronSessionSsr(handler, sessionOptions)
}
// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: User
  }
}
