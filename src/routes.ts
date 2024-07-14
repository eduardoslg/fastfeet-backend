import { FastifyInstance } from 'fastify'

import { usersRoutes } from './modules/users/routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
}
