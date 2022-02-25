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
    const { eventId } = req.query
    switch (req.method) {
      case 'GET': {
        const event = await Event.findOne({ _id: eventId }).exec()
        if (event) {
          res.status(200).json({ event })
          break
        }
        throw new Error()
      }
      case 'PUT': {
        const { currentUsers, joinersId } = req.body
        const mutateEvent = await Event.findByIdAndUpdate(eventId, {
          currentUsers,
          joinersId,
        }).exec()
        const event = await Event.find({}).sort('-_id').exec()
        if (mutateEvent && event) {
          res.status(200).json({ event })
          break
        }
        throw new Error()
      }
      case 'DELETE': {
        const deleteEvent = await Event.findOneAndDelete({
          _id: eventId,
        }).exec()
        const event = await Event.find({}).sort('-_id').exec()
        if (deleteEvent && event) {
          res.status(200).json({ event })
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
