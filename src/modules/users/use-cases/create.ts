import { hash } from 'bcryptjs'

import { mail } from '@/lib/mail'
import { AppError } from '@/shared/errors/app-error'
import { randomPassword } from '@/shared/utils/random-password'

import { UsersRepository } from '../repositories'

type CreateUserUseCaseData = {
  email: string
  name: string
  cpf: string
}

export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ email, name, cpf }: CreateUserUseCaseData) {
    const userAlreadyExists = await this.usersRepository.findByEmail({
      email,
    })

    if (userAlreadyExists)
      throw new AppError('Já existe um usuário cadastrado com este email.')

    const password = randomPassword(5)

    const passwordHash = await hash(password, 8)

    const user = await this.usersRepository.create({
      email,
      name,
      cpf,
      password: passwordHash,
    })

    await mail.sendMail({
      subject: 'Nova conta',
      name,
      email,
      body: mail.createdUserBody({ name, email, password }),
    })

    return {
      id: user.id,
      name,
      email,
      role: user.role,
      createdAt: user.createdAt,
    }
  }
}
