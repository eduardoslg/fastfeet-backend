import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { UserData } from '@/@types/fastify'
import { AppError } from '@/shared/errors/app-error'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUser = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: UserData }>()

        return sub
      } catch {
        throw new AppError('not-authorized')
      }
    }
  })
})
