import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { env } from '@/env'
import { UsersRepository } from '@/modules/users/repositories'
import { AppError } from '@/shared/errors/app-error'

type AuthenticateUseCaseData = {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ email, password }: AuthenticateUseCaseData) {
    const user = await this.usersRepository.findByEmail({ email })

    if (!user) {
      throw new AppError('Usuário não encontrado!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Usuário ou senha inválidos!')
    }

    const token = jwt.sign(
      {
        sub: {
          userId: user.id,
          role: user.role,
        },
      },
      env.JWT_SECRET,
      {
        expiresIn: '30d',
      },
    )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    }
  }
}
