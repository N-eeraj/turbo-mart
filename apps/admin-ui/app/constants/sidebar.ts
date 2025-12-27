import {
  Roles,
  Permissions,
} from "@app/database/mongoose/enums/admin/user"
import type {
  Sidebar,
  NavigationItem,
  NavigationGroup,
} from "@/types/sidebar"

const ADMIN_NAVIGATION = [
  {
    title: "Admin Management",
    collapsible: true,
    icon: "lucide:user-cog",
    items: [
      {
        title: "All Admins",
        url: "/admin",
      },
      {
        title: "Create Admin",
        url: "/admin/create",
      },
    ],
    access: {
      roles: [
        Roles.SUPER_ADMIN,
      ],
    },
  },
] as const satisfies Array<NavigationGroup>

const CATALOGUE_NAVIGATION = [
  {
    title: "Catalogue Management",
    icon: "ph:cube-focus",
    items: [
      {
        title: "Categories",
        url: "/catalogue/categories",
      },
      {
        title: "Subcategories",
        url: "/catalogue/subcategories",
      },
      {
        title: "Brands",
        url: "/catalogue/brands",
      },
      {
        title: "Products",
        url: "/catalogue/products",
      },
    ],
    access: {
      permissions: [
        Permissions.CATALOGUE_MANAGER,
      ],
    }
  },
] as const satisfies Array<NavigationGroup>

const NAVIGATION = [
  {
    title: "Home",
    url: "/",
    icon: "lucide:home",
  } satisfies NavigationItem,
  ...ADMIN_NAVIGATION,
  ...CATALOGUE_NAVIGATION,
] as const satisfies Sidebar

export default NAVIGATION
