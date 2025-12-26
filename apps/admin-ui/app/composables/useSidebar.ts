import {
  Roles,
  Permissions,
} from "@app/database/mongoose/enums/admin/user"

const NAVIGATION = [
  {
    title: "Home",
    url: "/",
    icon: "lucide:home",
  },
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
    roles: [
      Roles.SUPER_ADMIN,
    ],
  },
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
    permissions: [
      Permissions.CATALOGUE_MANAGER,
    ],
  },
]

export default function useSidebar() {
  const userStore = useUserStore()
  const {
    user,
  } = storeToRefs(userStore)

  const navigation = computed(() => {
    const userValue = user.value
    // returns empty array if user value is not set
    if (!userValue) return []

    // return whole navigation if user is of Super Admin role
    if (userValue.role === Roles.SUPER_ADMIN) return NAVIGATION

    // return role & permission based navigation
    return NAVIGATION
      .filter(({ roles, permissions }) => {
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
