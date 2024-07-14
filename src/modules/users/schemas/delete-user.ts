import z from 'zod'

export const deleteUserSchema = {
  schema: {
    tags: ['Usuários'],
    summary: 'Exclusão de usuário',
    security: [{ bearerAuth: [] }],
    params: z.object({
      id: z.coerce.number(),
    }),
    response: {
      200: z.boolean(),
    },
  },
}
