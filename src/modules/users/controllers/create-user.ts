import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authorization } from '@/middlewares/authorization'

import { makeCreateUserUseCase } from '../use-cases/factories/make-create'

export async function createUserController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      onRequest: authorization,
      schema: {
        tags: ['Usuários'],
        summary: 'Criação de usuário',
        security: [{ bearerAuth: [] }],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          cpf: z.string(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
            role: z.string(),
            createdAt: z.date(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, name, cpf } = request.body

      const createUserUseCase = makeCreateUserUseCase()

      const output = await createUserUseCase.execute({
        email,
        name,
        cpf,
      })

      return reply.status(201).send(output)
    },
  )
}
