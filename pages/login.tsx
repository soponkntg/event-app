import type { NextPage } from 'next'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Button from '../components/Button'
import logo from '../public/logo.png'
import Input from '../components/Input'
import axios from 'axios'

const Login: NextPage = () => {
  const [form, setForm] = React.useState({ email: '', password: '' })
  const router = useRouter()

  const loginHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    axios
      .post('/api/login', form)
      .then((res) => {
        console.log(res.data.message)
        router.replace('/')
      })
      .catch((e) => {
        alert(e.response.data.message)
      })
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col space-y-8 p-8 sm:mt-8 sm:rounded-xl sm:border sm:shadow-xl">
      <div className="mx-auto w-80 object-contain">
        <Image src={logo} alt="logo" />
      </div>

      <form onSubmit={loginHandler} className="space-y-10">
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={(e) => {
            const { value } = e.target
            setForm({ ...form, email: value })
          }}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => {
            const { value } = e.target
            setForm({ ...form, password: value })
          }}
        />
        <div className="flex flex-col justify-center space-y-4">
          <Button type="submit">Sign In</Button>
          <button
            className="rounded-xl px-6 py-2 outline outline-offset-0 outline-indigo-500 hover:bg-indigo-200"
            onClick={() => {
              router.push('/signup')
            }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
