import NAVIGATION from "@/constants/sidebar"
import type {
  Sidebar,
} from "@/types/sidebar"

export default function useSidebar() {
  const {
    user,
    checkUserHasAnyAccess,
  } = useUser()

  const navigation = computed<Sidebar>(() => {
    const userValue = user.value
    // returns empty array if user value is not set
    if (!userValue) return []

    // return role & permission based navigation
    return NAVIGATION.reduce((sidebar: Sidebar, navigation: Sidebar[number]) => {
      const hasNavigationAccess = checkUserHasAnyAccess(navigation)
      if (hasNavigationAccess) {
        const filteredItems = navigation.items ? navigation.items.filter(checkUserHasAnyAccess) : navigation.items

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
