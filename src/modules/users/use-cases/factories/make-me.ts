import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users-repository'
import { MeUseCase } from '../me'

export function makeMeUseCase(): MeUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new MeUseCase(usersRepository)

  return useCase
}
