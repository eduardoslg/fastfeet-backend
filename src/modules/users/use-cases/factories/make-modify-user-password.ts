import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users'
import { ModifyUserPasswordUseCase } from '../modify-user-password'

export function makeModifyUserPasswordUseCase(): ModifyUserPasswordUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new ModifyUserPasswordUseCase(usersRepository)

  return useCase
}
