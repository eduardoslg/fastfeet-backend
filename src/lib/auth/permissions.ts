import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(user, { can, cannot }) {},
  MEMBER(user, { can, cannot }) {
    can(['create', 'update', 'get'], 'User', {
      clientId: { $ne: user.clientId },
    })
    cannot(['create'], 'User', {
      clientId: { $ne: user.clientId },
    })
  },
}
