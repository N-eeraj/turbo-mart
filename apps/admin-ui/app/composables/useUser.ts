import {
  Roles,
  type Permissions,
} from "@app/database/mongoose/enums/admin/user"

interface AccessParams {
  roles?: Array<Roles>
  permissions?: Array<Permissions>
}

export default function useUser() {
  const userStore = useUserStore()
  const {
    user,
  } = storeToRefs(userStore)

  const checkUserHasAnyAccess = ({ roles, permissions }: AccessParams) => {
    const userValue = user.value
    // return false if user value is not set
    if (!userValue) return false

    // return true if user is of Super Admin role
    if (userValue.role === Roles.SUPER_ADMIN) return true

    let hasAccess = true
    if (roles?.length) {
      hasAccess = hasAccess && roles.includes(userValue.role)
    }
    if (permissions?.length) {
      hasAccess = hasAccess && userValue.permissions.some((userPermission) => permissions.includes(userPermission))
    }
    return hasAccess
  }

  return {
    user,
    checkUserHasAnyAccess,
  }
}
