import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authorization } from '@/middlewares/authorization'

import { makeUpdateUserUseCase } from '../use-cases/factories/make-update'

export async function updateUserController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/users/:id',
    {
      onRequest: authorization,
      schema: {
        tags: ['Usuários'],
        summary: 'Atualização de usuário',
        security: [{ bearerAuth: [] }],
        body: z.object({
          name: z.string().min(1),
        }),
        params: z.object({
          id: z.coerce.string(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            name: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name } = request.body
      const { id } = request.params

      const updateUserUseCase = makeUpdateUserUseCase()

      const output = await updateUserUseCase.execute({
        id,
        name,
      })

      return reply.status(200).send(output)
    },
  )
}
