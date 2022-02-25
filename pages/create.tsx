import type { GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Button from '../components/Button'
import logo from '../public/logo.png'
import Input from '../components/Input'
import axios from 'axios'
import { userFromRequest } from '../utils/authUtils'
import { CreateFormType, PageProps } from '../Type'

const Login: NextPage<PageProps> = ({ userId }) => {
  const [form, setForm] = React.useState<CreateFormType>({
    name: '',
    imageURL: '',
    maximumUsers: undefined,
    description: '',
  })
  const router = useRouter()

  const createHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    axios
      .post('/api/event', { ...form, ownerId: userId })
      .then((res) => {
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

      <form onSubmit={createHandler} className="space-y-10">
        <Input
          type="text"
          name="name"
          placeholder="name"
          value={form.name}
          onChange={(e) => {
            const { value } = e.target
            setForm({ ...form, name: value })
          }}
        />
        <Input
          type="text"
          name="description"
          placeholder="description"
          value={form.description}
          onChange={(e) => {
            const { value } = e.target
            setForm({ ...form, description: value })
          }}
        />
        <Input
          type="text"
          name="imageURL"
          placeholder="imageURL"
          value={form.imageURL}
          onChange={(e) => {
            const { value } = e.target
            setForm({ ...form, imageURL: value })
          }}
        />
        <Input
          type="number"
          name="maximumUsers"
          placeholder="maximumUsers"
          value={form.maximumUsers}
          onChange={(e) => {
            const { value } = e.target
            setForm({ ...form, maximumUsers: +value })
          }}
        />
        <div className="flex flex-col justify-center space-y-4">
          <Button type="submit">Create</Button>
        </div>
      </form>
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

export default Login
