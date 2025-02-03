import { AppError } from '@/shared/errors/app-error'

import { UsersRepository } from '../repositories'

export class GetUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(id: string) {
    const user = await this.usersRepository.findById({ id })

    if (!user) throw new AppError('Usuário não encontrado!')

    return {
      id,
      name: user.name,
      email: user.email,
    }
  }
}
