import { hash } from 'bcryptjs'

import { AppError } from '@/shared/errors/app-error'

import { UsersRepository } from '../repositories'

type ResetUserPasswordUseCaseData = {
  id: string
  password: string
}
export class ResetUserPasswordUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ id, password }: ResetUserPasswordUseCaseData) {
    const user = await this.usersRepository.findById({ id })

    if (!user) throw new AppError('Usuário não encontrado!')

    const passwordHash = await hash(password, 8)

    await this.usersRepository.update({
      id,
      name: user.name,
      password: passwordHash,
    })

    return {
      id,
    }
  }
}
