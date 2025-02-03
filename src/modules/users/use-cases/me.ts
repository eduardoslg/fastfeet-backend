import { AppError } from '@/shared/errors/app-error'

import { UsersRepository } from '../repositories'

export class MeUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(id: string) {
    const user = await this.usersRepository.findById({ id })

    if (!user) throw new AppError('Usuário não encontrado!')

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
  }
}
