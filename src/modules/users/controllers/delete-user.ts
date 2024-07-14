import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { auth } from '@/middlewares/verify-jwt'

import { deleteUserSchema } from '../schemas/delete-user'
import { makeDeleteUserUseCase } from '../use-cases/factories/make-delete-user'

export async function deleteUserController(app: FastifyInstance) {
  app
    .register(auth)
    .withTypeProvider<ZodTypeProvider>()
    .delete('/v1/users/:id', deleteUserSchema, async (request, reply) => {
      const user = await request.getCurrentUser()
      const { id } = request.params

      const deleteUserUseCase = makeDeleteUserUseCase()

      const output = await deleteUserUseCase.execute({
        id,
        clientId: user.clientId,
      })

      return reply.status(200).send(output)
    })
}
