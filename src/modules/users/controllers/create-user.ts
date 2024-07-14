import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { userSchema } from '@/lib/auth'
import { auth } from '@/middlewares/verify-jwt'
import { AppError } from '@/shared/errors/app-error'
import { getUserPermissions } from '@/shared/utils/get-user-permissions'

import { createUserSchema } from '../schemas/create-user'
import { makeCreateUserUseCase } from '../use-cases/factories/make-create-user'

export async function createUserController(app: FastifyInstance) {
  app
    .register(auth)
    .withTypeProvider<ZodTypeProvider>()
    .post('/v1/users', createUserSchema, async (request, reply) => {
      const { email, name, cpf } = request.body
      const user = await request.getCurrentUser()

      const authUser = userSchema.parse(user)

      const { cannot } = getUserPermissions(user)

      if (cannot('create', authUser)) {
        throw new AppError('cannot-create-user')
      }

      const createUserUseCase = makeCreateUserUseCase()

      const output = await createUserUseCase.execute({
        name,
        email,
        cpf,
      })

      return reply.status(201).send(output)
    })
}
