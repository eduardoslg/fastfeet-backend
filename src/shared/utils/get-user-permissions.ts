import { UserData } from '@/@types/fastify'
import { defineAbilityFor, userSchema } from '@/lib/auth'

export function getUserPermissions(user: UserData) {
  const authUser = userSchema.parse(user)

  const ability = defineAbilityFor(authUser)

  return ability
}
