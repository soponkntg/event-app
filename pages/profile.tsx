import axios from 'axios'
import type { GetServerSidePropsContext, NextPage } from 'next'
import { useState, useEffect } from 'react'
import EventCard from '../components/EventCard'
import Header from '../components/Header'
import Loading from '../components/Loading'
import Title from '../components/Title'
import { Event, EventResponse, PageProps } from '../Type'
import { userFromRequest } from '../utils/authUtils'

const Profile: NextPage<PageProps> = ({ userId }) => {
  const [event, setEvent] = useState<Event[]>([])
  const [loading, setLoadind] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoadind(true)
      const { data } = await axios.get<EventResponse>(
        `/api/event/user/${userId}`
      )
      setEvent(data.event)
      setLoadind(false)
    }
    fetchData()
  }, [])

  const eventRender = () => {
    return (
      <>
        {event.length === 0 ? (
          <h1 className="text-center">No event yet</h1>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {event.map((elem) => (
              <EventCard
                key={elem['_id']}
                {...elem}
                userId={userId}
                setEvent={setEvent}
                setLoading={setLoadind}
              />
            ))}
          </div>
        )}
      </>
    )
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Header />
          <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 md:p-6">
            <Title title="Explore" />
            {eventRender()}
          </div>
        </div>
      )}
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = userFromRequest(context.req)
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { userId: user.userId },
  }
}

export default Profile
