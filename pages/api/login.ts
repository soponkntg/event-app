import type { NextApiRequest, NextApiResponse } from 'next'
import { ErrorResponse } from '../../Type'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { clearCookieToken, setCookieToken } from '../../utils/authUtils'
import { dbConnect } from '../../database/dbConnect'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  try {
    switch (req.method) {
      case 'POST': {
        const { conn, User } = await dbConnect()
        const { email, password } = req.body
        const jwtKey = process.env.JWT_TOKEN_KEY as string
        const lowerCaseEmail = email.toLowerCase()

        const user = await User.findOne({ email: lowerCaseEmail }).exec()
        if (user && (await compare(password, user.password))) {
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            jwtKey,
            {
              expiresIn: '7d',
            }
          )
          setCookieToken(res, token)
          res.status(200).json({ message: 'Successfully login' })
          break
        }
        conn.disconnect()
        res.status(400).json({ message: 'Incorrect email or password' })
        break
      }
      case 'DELETE': {
        clearCookieToken(res)
        res.status(200).json({ message: 'Successfully logout' })
        break
      }
      default: {
        res.status(500).json({ message: 'Wrong http method' })
        break
      }
    }
  } catch (e) {
    res.status(500).json({ message: 'Internal error' })
  }
}
