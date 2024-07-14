import z from 'zod'

export const updateUserSchema = {
  schema: {
    tags: ['Usuários'],
    summary: 'Atualização de usuário',
    security: [{ bearerAuth: [] }],
    body: z.object({
      name: z.string(),
    }),
    params: z.object({
      id: z.coerce.number(),
    }),
    response: {
      201: z.object({
        id: z.number(),
        name: z.string().optional(),
      }),
    },
  },
}
