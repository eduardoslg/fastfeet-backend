import { FastifyInstance } from 'fastify'

import { createUserController } from '../controllers/create-user'
import { deleteUserController } from '../controllers/delete-user'
import { fetchUsersController } from '../controllers/fetch-users'
import { forgotPasswordController } from '../controllers/forgot-password'
import { getUserController } from '../controllers/get-user'
import { meUserController } from '../controllers/me-user'
import { resetUserPasswordController } from '../controllers/reset-password'
import { updateUserController } from '../controllers/update-user'

export async function usersRoutes(app: FastifyInstance) {
  app.register(createUserController)
  app.register(updateUserController)
  app.register(meUserController)
  app.register(forgotPasswordController)
  app.register(resetUserPasswordController)
  app.register(fetchUsersController)
  app.register(deleteUserController)
  app.register(getUserController)
}
