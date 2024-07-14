import { FastifyInstance } from 'fastify'

import { createUserController } from '../controllers/create-user'
import { deleteUserController } from '../controllers/delete-user'
import { modifyUserPasswordController } from '../controllers/modify-user-password'
import { updateUserController } from '../controllers/update-user'

export async function usersRoutes(app: FastifyInstance) {
  app.register(createUserController)
  app.register(updateUserController)
  app.register(modifyUserPasswordController)
  app.register(deleteUserController)
}
