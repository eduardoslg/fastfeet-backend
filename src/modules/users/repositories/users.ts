import { User } from '@prisma/client'

export type CreateUserData = {
  name: string
  email: string
  cpf: string
  password: string
}

export type UpdateUserData = {
  id: number
  name?: string
}

export type ModifyPasswordData = {
  id: number
  password: string
}

export interface UsersRepository {
  create(data: CreateUserData): Promise<User>
  update(data: UpdateUserData): Promise<boolean>
  modifyPassword(data: ModifyPasswordData): Promise<User>
  delete(id: number): Promise<boolean>
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByCpf(cpf: string): Promise<User | null>
}
