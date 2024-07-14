import { z } from 'zod'

import { roleSchema } from '../roles'

export const userSchema = z.object({
  __typename: z.literal('User').default('User'),
  userId: z.number(),
  clientId: z.number(),
  role: roleSchema,
})

export type User = z.infer<typeof userSchema>
