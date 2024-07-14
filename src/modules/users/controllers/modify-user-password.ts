import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { auth } from '@/middlewares/verify-jwt'

import { modifyUserPasswordSchema } from '../schemas/modify-user-password'
import { makeModifyUserPasswordUseCase } from '../use-cases/factories/make-modify-user-password'

export async function modifyUserPasswordController(app: FastifyInstance) {
  app
    .register(auth)
    .withTypeProvider<ZodTypeProvider>()
    .put(
      '/v1/users/modify-password',
      modifyUserPasswordSchema,
      async (request, apply) => {
        const { password } = request.body
        const { userId, clientId } = request.user.sub

        const modifyUserPasswordUseCase = makeModifyUserPasswordUseCase()

        const output = await modifyUserPasswordUseCase.execute({
          password,
          id: userId,
          clientId,
        })

        return apply.status(200).send(output)
      },
    )
}
