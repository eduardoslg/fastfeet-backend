import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authorization } from '@/middlewares/authorization'

import { makeGetUserUseCase } from '../use-cases/factories/make-get'

export async function getUserController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:id',
    {
      onRequest: authorization,
      schema: {
        tags: ['Usuários'],
        summary: 'Obter dados de um usuário',
        security: [{ bearerAuth: [] }],
        params: z.object({
          id: z.coerce.string(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            name: z.string().optional(),
            email: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const getUserUseCase = makeGetUserUseCase()

      const output = await getUserUseCase.execute(id)

      return reply.status(200).send(output)
    },
  )
}
