import {
  Roles,
  type Permissions,
} from "@app/database/mongoose/enums/admin/user"

interface AccessParams {
  roles?: Array<Roles>
  permissions?: Array<Permissions>
}

const checkRole = (userRole: AdminObject["role"], roles: Array<Roles>) => roles.includes(userRole)
const checkPermission = (
  userPermissions: AdminObject["permissions"],
  permissions: Array<Permissions>,
  type: "every" | "some"
) => {
  if (type !== "every" && type !== "some") throw `Invalid Type: ${type}`
  return userPermissions[type]((permission) => permissions.includes(permission))
}

export default function useUser() {
  const userStore = useUserStore()
  const {
    user,
  } = storeToRefs(userStore)

  /**
   * Determines whether the current user has access.
   * 
   * @param callback - A function invoked with the current `AdminObject`
   * when the user is not a Super Admin. Its return value determines access.
   * 
   * @returns
   * - `false` if no user is available.
   * - `true` if the user role is `Roles.SUPER_ADMIN`.
   * - The boolean result returned by the `callback` function.
   */
  const hasAccess = (callback: (_adminObject: AdminObject) => boolean): boolean => {
    const userValue = user.value
    // return false if user value is not set
    if (!userValue) return false

    // return true if user is of Super Admin role
    if (userValue.role === Roles.SUPER_ADMIN) return true

    return callback(userValue)
  }

  /**
   * Checks if the user has access based on the given roles.
   * 
   * @param roles - A list of roles to.
   * 
   * @returns a boolean value indicating if the user's role is included in the provided roles.
   */
  const hasRole = (roles: Array<Roles>): boolean => {
    return hasAccess((userValue: AdminObject) => checkRole(userValue.role, roles))
  }

  /**
   * Checks if the user has access based on the given permissions.
   * 
   * @param permissions - A list of permissions to.
   * 
   * @returns a boolean value indicating if the user's role is included in the provided permissions.
   */
  const hasAnyPermissions = (permissions: Array<Permissions>): boolean => {
    return hasAccess((userValue: AdminObject) => checkPermission(userValue.permissions, permissions, "some"))
  }

  /**
   * Checks if the user has access based on the given permissions.
   * 
   * @param permissions - A list of permissions to.
   * 
   * @returns a boolean value indicating if user has all of the provided permissions.
   */
  const hasAllPermissions = (permissions: Array<Permissions>): boolean => {
    return hasAccess((userValue: AdminObject) => checkPermission(userValue.permissions, permissions, "every"))
  }

  /**
   * Checks if the user has access based on the given roles and permissions.
   * Checks for a matching role **OR at least 1** permission.
   * 
   * @param accessParams - An object containing roles and permissions.
   * 
   * @returns a boolean value indicating if the user has access.
   */
  const hasRoleOrAnyPermissions = ({ roles, permissions }: AccessParams): boolean => {
    return hasAccess((userValue: AdminObject) => {
      if (roles?.length && checkRole(userValue.role, roles)) return true
      if (permissions?.length && checkPermission(userValue.permissions, permissions, "some")) return true
      return false
    })
  }

  /**
   * Checks if the user has access based on the given roles and permissions.
   * Checks for a matching role **AND at least 1** permission.
   * 
   * @param accessParams - An object containing roles and permissions.
   * 
   * @returns a boolean value indicating if the user has access.
   */
  const hasRoleAndAnyPermissions = ({ roles, permissions }: AccessParams): boolean => {
    return hasAccess((userValue: AdminObject) => {
      let hasAccess = true
      if (roles?.length) {
        hasAccess = hasAccess && checkRole(userValue.role, roles)
      }
      if (permissions?.length) {
        hasAccess = hasAccess && checkPermission(userValue.permissions, permissions, "some")
      }
      return hasAccess
    })
  }

  /**
   * Checks if the user has access based on the given roles and permissions.
   * Checks for a matching role **OR all** permissions.
   * 
   * @param accessParams - An object containing roles and permissions.
   * 
   * @returns a boolean value indicating if the user has access.
   */
  const hasRoleOrAllPermissions = ({ roles, permissions }: AccessParams): boolean => {
    return hasAccess((userValue: AdminObject) => {
      if (roles?.length && checkRole(userValue.role, roles)) return true
      if (permissions?.length && checkPermission(userValue.permissions, permissions, "every")) return true
      return false
    })
  }

  /**
   * Checks if the user has access based on the given roles and permissions.
   * Checks for a matching role **AND all** permissions.
   * 
   * @param accessParams - An object containing roles and permissions.
   * 
   * @returns a boolean value indicating if the user has access.
   */
  const hasRoleAndAllPermissions = ({ roles, permissions }: AccessParams): boolean => {
    return hasAccess((userValue: AdminObject) => {
    let hasAccess = true
      if (roles?.length) {
        hasAccess = hasAccess && checkRole(userValue.role, roles)
      }
      if (permissions?.length) {
        hasAccess = hasAccess && checkPermission(userValue.permissions, permissions, "every")
      }
      return hasAccess
    })
  }

  return {
    user,
    hasRole,
    hasAnyPermissions,
    hasAllPermissions,
    hasRoleOrAnyPermissions,
    hasRoleAndAnyPermissions,
    hasRoleOrAllPermissions,
    hasRoleAndAllPermissions,
  }
}
