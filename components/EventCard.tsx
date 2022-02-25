import axios from 'axios'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { Event, EventResponse, PageProps } from '../Type'
import Button from './Button'

function EventCard({
  _id,
  imageURL,
  currentUsers,
  maximumUsers,
  ownerId,
  name,
  joinersId,
  userId,
  setEvent,
  setLoading,
}: Event &
  PageProps & {
    setEvent: Dispatch<SetStateAction<Event[]>>
    setLoading: Dispatch<SetStateAction<boolean>>
  }) {
  const fullYet = currentUsers === maximumUsers
  const joinYet = joinersId.includes(userId)
  const owned = ownerId === userId

  const joinHandler = async () => {
    setLoading(true)
    const newJoiner = [...joinersId, userId]
    const { data } = await axios.put<{ event: Event[] }>(`/api/event/${_id}`, {
      currentUsers: ++currentUsers,
      joinersId: newJoiner,
    })
    const { event } = data
    setEvent(event)
    setLoading(false)
  }

  const deleteHandler = async () => {
    setLoading(true)
    const { data } = await axios.delete(`/api/event/${_id}`)
    const { event } = data
    setEvent(event)
    setLoading(false)
  }

  return (
    <div>
      <div className="group cursor-pointer overflow-hidden rounded-xl border shadow-lg">
        <Link href={`/${_id}`}>
          <img
            src={imageURL}
            className="h-60 w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </Link>
        <div className="flex justify-between bg-white p-5">
          <div>
            <h1 className="text-xl font-bold">
              {`${currentUsers} /`}{' '}
              <span className="text-2xl">{maximumUsers}</span>
            </h1>
            <h3>{name}</h3>
          </div>
          <Button disabled={fullYet || joinYet} onClick={joinHandler}>
            {joinYet ? 'Joined' : 'Join'}
          </Button>
        </div>
        {owned && (
          <button
            className="mx-auto mb-4 block rounded-lg border-2 border-rose-400 px-10 py-2 text-rose-400 hover:bg-rose-200"
            onClick={deleteHandler}
          >
            Delete Event
          </button>
        )}
      </div>
    </div>
  )
}

export default EventCard
