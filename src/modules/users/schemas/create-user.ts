import z from 'zod'

import { removeSpecialCharacters } from '@/shared/utils/remove-special-characters'

export const createUserSchema = {
  schema: {
    tags: ['Usuários'],
    summary: 'Criação de usuário',
    security: [{ bearerAuth: [] }],
    body: z.object({
      name: z.string(),
      email: z.string().email(),
      cpf: z.string().refine((cpf) => removeSpecialCharacters(cpf)),
      password: z.string().refine(
        (value) => {
          const hasMinLength = value.length >= 8
          const hasUpperCase = /[A-Z]/.test(value)
          const hasNumber = /\d/.test(value)
          const hasSpecialChar = /[@$!%*?&#]/.test(value)

          return hasMinLength && hasUpperCase && hasNumber && hasSpecialChar
        },
        {
          message:
            'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial',
        },
      ),
    }),
    response: {
      201: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
        cpf: z.string(),
      }),
    },
  },
}
