import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../../database/dbConnect'
import { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { setCookieToken } from '../../utils/authUtils'
import { ErrorResponse } from '../../Type'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  try {
    if (req.method === 'POST') {
      const { conn, User } = await dbConnect()
      const { email, password } = req.body
      const jwtKey = process.env.JWT_TOKEN_KEY as string
      const lowerCaseEmail = email.toLowerCase()
      const encryptedPassword = await hash(password, 10)

      const repeatedUser = await User.findOne({ email: lowerCaseEmail }).exec()
      if (repeatedUser) {
        return res.status(409).json({ message: 'User is already exist' })
      }

      const user = await User.create({
        email: lowerCaseEmail,
        password: encryptedPassword,
      })

      const token = jwt.sign({ userId: user._id, email: user.email }, jwtKey, {
        expiresIn: '7d',
      })
      setCookieToken(res, token)
      conn.disconnect()
      return res.status(200).json({ message: 'Successfully created user' })
    }
    res.status(500).json({ message: 'Wrong http method' })
  } catch (e) {
    res.status(500).json({ message: 'Internal error' })
  }
}
