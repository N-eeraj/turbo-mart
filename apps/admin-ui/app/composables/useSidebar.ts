import NAVIGATION from "@/constants/sidebar"
import type {
  Access,
  Sidebar,
} from "@/types/sidebar"

export default function useSidebar() {
  const {
    user,
    hasRole,
    hasAnyPermissions,
    hasAllPermissions,
    hasRoleOrAnyPermissions,
    hasRoleOrAllPermissions,
    hasRoleAndAnyPermissions,
    hasRoleAndAllPermissions,
  } = useUser()

  const accessHandler = (access: Access | undefined): boolean => {
    if (!access) return true
    let hasNavigationAccess = false
    if ("roles" in access) {
      hasNavigationAccess = hasRole(access.roles)
    } else if ("permissions" in access) {
      if (access.permissionType === "all") {
        hasNavigationAccess = hasAllPermissions(access.permissions)
      } else {
        hasNavigationAccess = hasAnyPermissions(access.permissions)
      }
    } else if ("or" in access) {
      const { permissionType, ...control } = access.or
      if (permissionType === "all") {
        hasNavigationAccess = hasRoleOrAllPermissions(control)
      } else {
        hasNavigationAccess = hasRoleOrAnyPermissions(control)
      }
    } else if ("and" in access) {
      const { permissionType, ...control } = access.and
      if (permissionType === "all") {
        hasNavigationAccess = hasRoleAndAllPermissions(control)
      } else {
        hasNavigationAccess = hasRoleAndAnyPermissions(control)
      }
    }
    return hasNavigationAccess
  }

  const navigation = computed<Sidebar>(() => {
    const userValue = user.value
    // returns empty array if user value is not set
    if (!userValue) return []

    // return role & permission based navigation
    return NAVIGATION.reduce((sidebar: Sidebar, navigation: Sidebar[number]) => {
      const hasNavigationAccess = accessHandler(navigation.access)
      if (hasNavigationAccess) {
        const filteredItems = navigation.items?.filter(({ access }) => accessHandler(access))

        sidebar.push({
          ...navigation,
          items: filteredItems,
        } as Sidebar[number])
      }
      return sidebar
    }, [])
  })

  return {
    navigation,
  }
}
