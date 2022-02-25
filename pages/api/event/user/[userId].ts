import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../../../../database/dbConnect'
import { ErrorResponse } from '../../../../Type'

type Data = {
  event: Event[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  try {
    const { conn, Event } = await dbConnect()
    const { userId } = req.query
    if (req.method === 'GET') {
      const event = await Event.find({ ownerId: userId }).exec()
      if (event) {
        res.status(200).json({ event })
      }
    } else {
      res.status(500).json({ message: 'Wrong http method' })
    }
    conn.disconnect()
  } catch (e) {
    res.status(500).json({ message: 'Internal error' })
  }
}
