import z from 'zod'

export const modifyUserPasswordSchema = {
  schema: {
    tags: ['Usuários'],
    summary: 'Alteração de senha',
    security: [{ bearerAuth: [] }],
    body: z
      .object({
        token: z.string(),
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
        confirmPassword: z.string(),
      })
      .refine(({ password, confirmPassword }) => password !== confirmPassword, {
        message: 'As senhas não batem.',
      }),
    response: {
      201: z.boolean(),
    },
  },
}
