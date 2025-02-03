import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users-repository'
import { FetchUsersUseCase } from '../fetch'

export function makeFetchUsersUseCase(): FetchUsersUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new FetchUsersUseCase(usersRepository)

  return useCase
}
