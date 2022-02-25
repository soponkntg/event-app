import mongoose from 'mongoose'

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const MONGODB_URI = process.env.MONGODB_URI

// connection function
export const dbConnect = async () => {
  const conn = await mongoose.connect(MONGODB_URI as string).catch((err) => {
    throw err
  })
  console.log('Mongoose Connection Established')

  const eventSchema = new mongoose.Schema({
    name: { type: String },
    imageURL: { type: String },
    maximumUsers: { type: Number },
    currentUsers: { type: Number, default: 0 },
    ownerId: { type: String },
    joinersId: { type: [String] },
    description: { type: String },
  })

  const Event = mongoose.models.event || mongoose.model('event', eventSchema)

  const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
  })

  const User = mongoose.models.user || mongoose.model('user', userSchema)

  return { conn, User, Event }
}
