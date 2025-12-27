import type {
  Roles,
  Permissions,
} from "@app/database/mongoose/enums/admin/user"

interface NavigationBase {
  title: string
  icon?: string
  roles?: Array<Roles>
  permissions?: Array<Permissions>
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
