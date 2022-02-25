import { useRouter } from 'next/router'
import Button from './Button'

interface Props {
  title: string
}

function Title({ title }: Props) {
  const router = useRouter()
  return (
    <div className="grid grid-cols-3">
      <h1 className="col-start-2 text-center text-2xl font-bold tracking-wide text-slate-800">
        {title}
      </h1>
      <div className="grid justify-items-end">
        <Button
          onClick={() => {
            router.push('/create')
          }}
        >
          + <span className="hidden sm:inline">Create New Event</span>
        </Button>
      </div>
    </div>
  )
}

export default Title
