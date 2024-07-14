import { AppError } from '@/shared/errors/app-error'

import { UsersRepository } from '../repositories/users'

export class DeleteUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(id: number) {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new AppError('user-already-exists')
    }

    await this.usersRepository.delete(id)

    return true
  }
}
