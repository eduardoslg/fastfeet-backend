import { hash } from 'bcryptjs'

import { AppError } from '@/shared/errors/app-error'

import { ModifyPasswordData, UsersRepository } from '../repositories/users'

export class ModifyUserPasswordUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ password, id }: ModifyPasswordData) {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new AppError('user-not-found')
    }

    const passwordHash = await hash(password, 8)

    await this.usersRepository.modifyPassword({
      id,
      password: passwordHash,
    })

    return true
  }
}
