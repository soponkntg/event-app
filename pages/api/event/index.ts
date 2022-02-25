import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../../../database/dbConnect'
import { ErrorResponse } from '../../../Type'

type Data = {
  event: Event | Event[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  try {
    const { conn, Event } = await dbConnect()
    switch (req.method) {
      case 'GET': {
        const event = await Event.find({}).sort('-_id').exec()
        if (event) {
          res.status(200).json({ event })
          break
        }
        throw new Error()
      }
      case 'POST': {
        const { name, imageURL, maximumUsers, ownerId, description } = req.body
        const newEvent = await Event.create({
          name,
          imageURL,
          maximumUsers,
          ownerId,
          description,
        })
        if (newEvent) {
          res.status(200).json({ event: newEvent })
          break
        }
        throw new Error()
      }
      default: {
        res.status(500).json({ message: 'Wrong http method' })
        break
      }
    }
    conn.disconnect()
  } catch (e) {
    res.status(500).json({ message: 'Internal error' })
  }
}
