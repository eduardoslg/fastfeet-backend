import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authorization } from '@/middlewares/authorization'

import { makeResetUserPasswordUseCase } from '../use-cases/factories/make-reset-password'

export async function resetUserPasswordController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/users/reset-password',
    {
      onRequest: authorization,
      schema: {
        tags: ['Usuários'],
        summary: 'Alteração de senha',
        security: [{ bearerAuth: [] }],
        body: z
          .object({
            password: z.string().refine(
              (value) => {
                const hasMinLength = value.length >= 6
                const hasUpperCase = /[A-Z]/.test(value)
                const hasNumber = /\d/.test(value)
                const hasSpecialChar = /[@$!%*?&#]/.test(value)

                return (
                  hasMinLength && hasUpperCase && hasNumber && hasSpecialChar
                )
              },
              {
                message:
                  'A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, um número e um caractere especial',
                path: ['password'],
              },
            ),
            confirmPassword: z.string(),
          })
          .refine(
            ({ password, confirmPassword }) => password === confirmPassword,
            {
              message: 'As senhas não batem.',
              path: ['password'],
            },
          ),
        response: {
          200: z.object({
            id: z.string(),
          }),
        },
      },
    },
    async (request, apply) => {
      const { password } = request.body
      const { userId } = request.user.sub

      const resetUserPasswordUseCase = makeResetUserPasswordUseCase()

      const output = await resetUserPasswordUseCase.execute({
        id: userId,
        password,
      })

      return apply.status(200).send(output)
    },
  )
}
