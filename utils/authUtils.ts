import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { CookieSerializeOptions } from 'next/dist/server/web/types'
import jwt from 'jsonwebtoken'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import { User } from '../Type'
import { IncomingMessage } from 'http'

const cookieOptions: CookieSerializeOptions = {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7,
  path: '/',
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
}

export const setCookieToken = (
  res: NextApiResponse,
  token: string,
  options: CookieSerializeOptions = cookieOptions
) => {
  res.setHeader('Set-Cookie', serialize('token', token, options))
}

export function clearCookieToken(res: NextApiResponse) {
  setCookieToken(res, '0', {
    ...cookieOptions,
    path: '/',
    maxAge: 0,
  })
}

export function userFromRequest(
  req: IncomingMessage & { cookies: NextApiRequestCookies }
): User | undefined {
  const { token } = req.cookies

  if (!token) return undefined

  try {
    const user = jwt.verify(token, process.env.JWT_TOKEN_KEY as string)
    return user as User
  } catch (error) {
    return undefined
  }
}
