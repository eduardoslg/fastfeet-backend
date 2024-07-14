import { prisma } from '@/prisma'
import { User } from '@prisma/client'

import {
  CreateUserData,
  ModifyPasswordData,
  UpdateUserData,
  UsersRepository,
} from '../users'

export class PrismaUsersRepository implements UsersRepository {
  async create({ name, email, cpf, password }: CreateUserData): Promise<User> {
    const output = await prisma.user.create({
      data: {
        name,
        email,
        cpf,
        password,
      },
    })

    return output
  }

  async update({ id, name }: UpdateUserData) {
    await prisma.user.update({
      data: {
        name,
      },
      where: {
        id,
      },
    })

    return true
  }

  async modifyPassword({ id, password }: ModifyPasswordData): Promise<User> {
    const output = await prisma.user.update({
      data: {
        password,
      },
      where: {
        id,
      },
    })

    return output
  }

  async delete(id: number): Promise<boolean> {
    await prisma.user.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id,
      },
    })

    return true
  }

  async findById(id: number): Promise<User | null> {
    const output = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return output
  }

  async findByEmail(email: string): Promise<User | null> {
    const output = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return output
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const output = await prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    return output
  }
}
