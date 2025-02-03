import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users-repository'
import { UpdateUserUseCase } from '../update'

export function makeUpdateUserUseCase(): UpdateUserUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new UpdateUserUseCase(usersRepository)

  return useCase
}
