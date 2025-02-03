import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users-repository'
import { ResetUserPasswordUseCase } from '../reset-password'

export function makeResetUserPasswordUseCase(): ResetUserPasswordUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new ResetUserPasswordUseCase(usersRepository)

  return useCase
}
