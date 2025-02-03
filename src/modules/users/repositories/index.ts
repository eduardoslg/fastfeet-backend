import { User } from '@prisma/client'

export type FindByIdData = {
  id: string
}

export type FindByEmailData = {
  email: string
}

export type CreateData = {
  email: string
  name: string
  cpf: string
  password: string
}

export type UpdateData = {
  id: string
  name: string
  password: string
}

export type FetchData = {
  whereCondition: string
  limit: number
  offset: number
}

export type FetchResultData = {
  count: number
  data: any[]
}

export type FetchUserData = {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface UsersRepository {
  findById(data: FindByIdData): Promise<User | null>
  findByEmail(data: FindByEmailData): Promise<User | null>
  create(data: CreateData): Promise<User>
  update(data: UpdateData): Promise<void>
  delete(id: string): Promise<void>
  fetch(data: FetchData): Promise<FetchResultData>
}
