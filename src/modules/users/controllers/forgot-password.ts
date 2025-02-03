import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import jwt from 'jsonwebtoken'

import { env } from '@/env'
import { mail } from '@/lib/mail'
import { prisma } from '@/prisma'
import { AppError } from '@/shared/errors/app-error'

import { forgotUserPasswordSchema } from '../schemas/forgot-user-password'

export async function forgotPasswordController(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/users/forgot-password',
      { schema: forgotUserPasswordSchema },
      async (request, apply) => {
        const { email } = request.body

        const user = await prisma.user.findFirst({
          where: {
            email,
            deletedAt: {
              equals: null,
            },
          },
        })

        if (!user) throw new AppError('Usuário não encontrado!')

        const token = jwt.sign(
          {
            sub: {
              userId: user.id,
            },
          },
          env.JWT_SECRET,
          {
            expiresIn: '30m',
          },
        )

        await mail.sendForgotPasswordMail({ name: user.name, email, token })

        return apply.status(200).send({ email })
      },
    )
}
