import { AppError } from '@/shared/errors/app-error'

import { UsersRepository } from '../repositories'

type UpdateUserUseCaseData = {
  id: string
  name: string
}

export class UpdateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ id, name }: UpdateUserUseCaseData) {
    const user = await this.usersRepository.findById({ id })

    if (!user) throw new AppError('Usuário não encontrado!')

    await this.usersRepository.update({
      id,
      name,
      password: user.password,
    })

    return {
      id,
      name,
    }
  }
}
