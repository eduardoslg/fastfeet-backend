import { PrismaUsersRepository } from '@/modules/users/repositories/implementations/prisma-users-repository'

import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase(): AuthenticateUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new AuthenticateUseCase(usersRepository)

  return useCase
}
