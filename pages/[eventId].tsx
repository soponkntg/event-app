import axios from 'axios'
import type { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Button from '../components/Button'
import Header from '../components/Header'
import { Event, EventResponse, PageProps } from '../Type'
import { userFromRequest } from '../utils/authUtils'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const EventDetail: NextPage<PageProps> = ({ userId }) => {
  const router = useRouter()
  const { eventId } = router.query
  const { data } = useSWR<{ event: Event }>(`/api/event/${eventId}`, fetcher)

  const joinHandler = async (event: Event) => {
    const newJoiner = [...event.joinersId, userId]
    await axios.put<EventResponse>(`/api/event/${event._id}`, {
      currentUsers: ++event.currentUsers,
      joinersId: newJoiner,
    })
    router.push('/')
  }

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-12 md:p-6">
        {data && (
          <div className="space-y-8 md:flex md:justify-evenly md:space-x-6 md:space-y-0">
            <img
              src={data.event.imageURL}
              className="mx-auto h-60 w-full max-w-lg rounded-md object-cover"
            />
            <div className="space-y-6">
              <div className="md:flex- flex items-center justify-between">
                <h1 className="text-2xl font-semibold">{data.event.name}</h1>
                <div className="text-center">
                  <h6 className="text-stale-400 text-xs">Current Users</h6>
                  <h4 className="rounded-full bg-indigo-500 text-xl text-white">{`${data.event.currentUsers} / ${data?.event.maximumUsers}`}</h4>
                </div>
              </div>
              <p className="text-stale-400 text-sm">
                {data?.event.description}
              </p>
              <div className="flex flex-col">
                <Button
                  onClick={() => {
                    joinHandler(data.event)
                  }}
                >
                  Join
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
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

export default EventDetail
