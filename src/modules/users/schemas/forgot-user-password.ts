import z from 'zod'

export const forgotUserPasswordSchema = {
  tags: ['Usuários'],
  summary: 'Recuperação de senha',
  body: z.object({
    email: z.string().email(),
  }),
  response: {
    200: z.object({
      email: z.string().email(),
    }),
  },
}
