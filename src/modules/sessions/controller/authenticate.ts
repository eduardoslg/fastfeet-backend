import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeAuthenticateUseCase } from '../use-cases/factories/make-authenticate'

export async function authenticateController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    {
      schema: {
        tags: ['Login'],
        summary: 'Login de usuários',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
            role: z.enum(['ADMIN', 'DELIVERYMAN']),
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const authenticateUseCase = makeAuthenticateUseCase()

      const output = await authenticateUseCase.execute({ email, password })

      return reply.status(200).send(output)
    },
  )
}
