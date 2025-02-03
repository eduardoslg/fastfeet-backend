import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users-repository'
import { CreateUserUseCase } from '../create'

export function makeCreateUserUseCase(): CreateUserUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new CreateUserUseCase(usersRepository)

  return useCase
}
