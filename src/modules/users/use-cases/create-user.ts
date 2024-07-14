import { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { env } from '@/config/env'
import { AppError } from '@/shared/errors/app-error'

import { UsersRepository } from '../repositories/users'

type CreateUserUseCaseData = {
  name: string
  email: string
  cpf: string
  password: string
}

export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ name, email, cpf, password }: CreateUserUseCaseData) {
    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('user-already-exists')
    }

    const cpfExists = await this.usersRepository.findByCpf(cpf)

    if (cpfExists) {
      throw new AppError('user-already-exists')
    }

    const passwordHash = await hash(password, 8)

    const output = await this.usersRepository.create({
      name,
      email,
      cpf,
      password: passwordHash,
    })

    const token = jwt.sign(
      {
        sub: {
          userId: output.id,
          role: output.role,
        },
      },
      env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    )

    return {
      id: output.id,
      name,
      email,
      cpf,
      token,
    }
  }
}
