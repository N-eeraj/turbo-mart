import {
  type AdminData,
} from "@app/schemas/admin/user"

interface AdminObject extends AdminData {
  id: string
  createdAt: Date
  profilePicture?: string
}

interface Token {
  value: string
  expiresAt: Date
}

export const useUserStore = defineStore("user", () => {
  const user = ref<AdminObject | null>()
  const token = ref<Token | null>()

  const setUser = (data: AdminObject) => user.value = data
  const setToken = (tkn: Token) => token.value = tkn

  const clearUser = () => {
    user.value = null
    token.value = null
  }
  
  const isLoggedIn = computed(() => !!user.value && !!token.value)

  return {
    user,
    isLoggedIn,
    setUser,
    setToken,
    clearUser,
  }
})
