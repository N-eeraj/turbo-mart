import {
  Roles,
} from "@app/database/mongoose/enums/admin/user"
import NAVIGATION from "@/constants/sidebar"
import type {
  Sidebar,
} from "@/types/sidebar"

export default function useSidebar() {
  const userStore = useUserStore()
  const {
    user,
  } = storeToRefs(userStore)

  const navigation = computed<Sidebar>(() => {
    const userValue = user.value
    // returns empty array if user value is not set
    if (!userValue) return []

    // return whole navigation if user is of Super Admin role
    if (userValue.role === Roles.SUPER_ADMIN) return NAVIGATION

    // return role & permission based navigation
    return NAVIGATION
      .filter(({ roles, permissions }: Sidebar[number]) => {
        let enabled = true
        if (roles) {
          enabled = enabled && roles.includes(userValue.role)
        }
        if (permissions?.length) {
          enabled = enabled && userValue.permissions.some((userPermission) => permissions.includes(userPermission))
        }
        return enabled
      })
  })

  return {
    navigation,
  }
}
