import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/logo.png'
import axios from 'axios'
import { useRouter } from 'next/router'

function Header() {
  const router = useRouter()
  const logoutHandler = () => {
    axios
      .delete('/api/login')
      .then((res) => {
        console.log(res.data.message)
        router.replace('/login')
      })
      .catch((e) => {
        alert(e)
      })
  }
  return (
    <header className="m-auto flex max-w-7xl items-center justify-between border-b-2 bg-white p-4">
      <Link href={'/'}>
        <div className="w-44 cursor-pointer object-contain">
          <Image src={logo} alt="logo" />
        </div>
      </Link>
      <div className="flex items-center space-x-5">
        <Link href={'/profile'}>
          <h3 className="cursor-pointer">Profile</h3>
        </Link>
        <Link href={'/login'}>
          <button
            className="cursor-pointer rounded-full bg-indigo-700 px-6 py-2 text-white hover:bg-indigo-500"
            onClick={logoutHandler}
          >
            sign out
          </button>
        </Link>
      </div>
    </header>
  )
}

export default Header
