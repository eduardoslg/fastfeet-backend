import { prisma } from '@/prisma'
import { Prisma, User } from '@prisma/client'

import {
  CreateData,
  FetchData,
  FetchResultData,
  FetchUserData,
  FindByEmailData,
  FindByIdData,
  UpdateData,
  UsersRepository,
} from '..'

export class PrismaUsersRepository implements UsersRepository {
  async findById({ id }: FindByIdData): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail({ email }: FindByEmailData): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    return user
  }

  async create({ email, name, cpf, password }: CreateData): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        cpf,
        password,
      },
    })

    return user
  }

  async update({ id, name, password }: UpdateData): Promise<void> {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        password,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        active: false,
      },
    })
  }

  async fetch({
    limit,
    offset,
    whereCondition,
  }: FetchData): Promise<FetchResultData> {
    const [count] = await prisma.$queryRaw<{ count: number }[]>`
      select count(u.id)
        from users u
       where u.deleted_at is null
      ${Prisma.raw(whereCondition)}
    `

    const result = await prisma.$queryRaw<FetchUserData[]>`
      select u.id,
             u.name,
             u.email,
             u.created_at as "createdAt"
        from users u
       where u.deleted_at is null
      ${Prisma.raw(whereCondition)}
       order by u.id desc
       limit ${limit}
      offset ${offset}
    `

    return {
      count: Number(count.count),
      data: result,
    }
  }
}
