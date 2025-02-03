import { AppError } from '@/shared/errors/app-error'

import { UsersRepository } from '../repositories'

export class DeleteUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(id: string) {
    const userExists = await this.usersRepository.findById({ id })

    if (!userExists) throw new AppError('Usuário não encontrado!')

    await this.usersRepository.delete(id)

    return {
      id,
    }
  }
}
