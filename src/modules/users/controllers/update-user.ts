import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { userSchema } from '@/lib/auth'
import { auth } from '@/middlewares/verify-jwt'
import { AppError } from '@/shared/errors/app-error'
import { getUserPermissions } from '@/shared/utils/get-user-permissions'

import { updateUserSchema } from '../schemas/update-user'
import { makeUpdateUserUseCase } from '../use-cases/factories/make-update-user'

export async function updateUserController(app: FastifyInstance) {
  app
    .register(auth)
    .withTypeProvider<ZodTypeProvider>()
    .put('/v1/users/:id', updateUserSchema, async (request, reply) => {
      const { name } = request.body
      const { id } = request.params

      const user = await request.getCurrentUser()

      const authUser = userSchema.parse(user)

      const { can } = getUserPermissions(user)

      if (can('update', authUser)) {
        throw new AppError('cannot-update-user')
      }

      const updateUserUseCase = makeUpdateUserUseCase()

      const output = await updateUserUseCase.execute({
        id,
        name,
        clientId: user.clientId,
      })

      return reply.status(201).send(output)
    })
}
