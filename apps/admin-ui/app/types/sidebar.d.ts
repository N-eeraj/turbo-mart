import type {
  Roles,
  Permissions,
} from "@app/database/mongoose/enums/admin/user"

interface AccessControl {
  roles: Array<Roles>
  permissions: Array<Permissions>
  permissionType?: "any" | "all"
}

interface OrAccessControl {
  or: AccessControl
}

interface AndAccessControl {
  and: AccessControl
}

type Access =
  Pick<AccessControl, "roles">
  | Omit<AccessControl, "roles">
  | OrAccessControl
  | AndAccessControl

interface NavigationBase {
  title: string
  icon?: string
  access?: Access
}

export interface NavigationItem extends NavigationBase {
  url: string
  items?: undefined
}

export interface NavigationGroup extends NavigationBase {
  items: Array<NavigationItem>
  collapsible?: boolean
}

export type Sidebar = Array<NavigationItem | NavigationGroup>
