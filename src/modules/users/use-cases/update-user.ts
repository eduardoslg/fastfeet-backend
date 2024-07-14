import { AppError } from '@/shared/errors/app-error'

import { UsersRepository, UpdateUserData } from '../repositories/users'

export class UpdateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ id, name }: UpdateUserData) {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new AppError('user-not-found')
    }

    await this.usersRepository.update({ id, name })

    return {
      id,
      name,
    }
  }
}
