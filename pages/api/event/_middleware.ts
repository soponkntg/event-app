import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const jwtKey = process.env.JWT_TOKEN_KEY as string

export function middleware(req: NextRequest) {
  const cookie = req.cookies['token']
  if (cookie) {
    const data = jwt.verify(cookie, jwtKey)
    if (data) {
      return NextResponse.next()
    }
  }
  return new Response('Unauthorized', { status: 401 })
}
