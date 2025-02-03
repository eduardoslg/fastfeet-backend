import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users-repository'
import { DeleteUserUseCase } from '../delete'

export function makeDeleteUserUseCase(): DeleteUserUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new DeleteUserUseCase(usersRepository)

  return useCase
}
