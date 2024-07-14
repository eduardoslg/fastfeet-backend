import { PrismaUsersRepository } from '../../repositories/implementations/prisma-users'
import { CreateUserUseCase } from '../create-user'

export function makeCreateUserUseCase(): CreateUserUseCase {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new CreateUserUseCase(usersRepository)

  return useCase
}
