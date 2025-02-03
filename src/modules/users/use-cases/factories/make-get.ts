import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users-repository'
import { GetUserUseCase } from '../get'

export function makeGetUserUseCase(): GetUserUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new GetUserUseCase(usersRepository)

  return useCase
}
