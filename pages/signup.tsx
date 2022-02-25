import type { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import logo from '../public/logo.png'
import axios from 'axios'
import { useRouter } from 'next/router'

const Signup: NextPage = () => {
  const [agree, setAgree] = React.useState(true)
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    confirmedPassword: '',
  })
  const router = useRouter()

  const signupHandler = (event: React.FormEvent) => {
    event.preventDefault()
    if (form.password !== form.confirmedPassword) {
      alert('The password is not match')
    }
    axios
      .post('/api/signup', { email: form.email, password: form.password })
      .then((res) => {
        console.log(res.data.message)
        router.replace('/')
      })
      .catch((e) => {
        alert(e.response.data.message)
      })
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col p-8 sm:mt-8 sm:rounded-xl sm:border sm:shadow-xl">
      <div className="mx-auto w-80 cursor-pointer object-contain">
        <Image src={logo} alt="logo" />
      </div>
      <form onSubmit={signupHandler} className="space-y-8">
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
        <Input
          type="password"
          name="confirmedPassword"
          placeholder="Confirmed Password"
          value={form.confirmedPassword}
          onChange={(e) => {
            const { value } = e.target
            setForm({ ...form, confirmedPassword: value })
          }}
        />
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300"
              onChange={() => {
                setAgree((prev) => !prev)
              }}
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium">
              I agree with the{' '}
              <span className="text-blue-600 hover:underline">
                terms and conditions
              </span>
            </label>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <Button type="submit" disabled={agree}>
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Signup
