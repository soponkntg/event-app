export interface Event {
  _id: string
  name: string
  imageURL: string
  maximumUsers: number
  currentUsers: number
  ownerId: string
  joinersId: string[]
  description: string
  __v: number
}

export interface EventResponse {
  event: Event[]
}

export interface User {
  userId: string
  email: string
  iat: number
  exp: number
}

export interface ErrorResponse {
  message: string
}

export interface PageProps {
  userId: string
}

export interface CreateFormType {
  name: string
  imageURL: string
  maximumUsers: number | undefined
  description: string
}
