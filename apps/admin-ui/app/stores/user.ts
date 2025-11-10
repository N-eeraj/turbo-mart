import {
  useCookies,
} from "@vueuse/integrations/useCookies"

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

const AUTH_TOKEN_KEY = "authToken"

export const useUserStore = defineStore("user", () => {
  const cookies = useCookies()

  const user = ref<AdminObject | null>()
  const token = ref<Token["value"] | null>(cookies.get(AUTH_TOKEN_KEY))

  const setUser = (data: AdminObject) => {
    user.value = data
  }

  const setToken = ({ value, expiresAt }: Token) => {
    token.value = value
    cookies.set(AUTH_TOKEN_KEY, value, {
      expires: new Date(expiresAt),
    })
  }

  const clearUser = () => {
    user.value = null
    token.value = null
    cookies.remove(AUTH_TOKEN_KEY)
  }
  
  const isLoggedIn = computed(() => !!user.value && !!token.value)

  return {
    user,
    token,
    isLoggedIn,
    setUser,
    setToken,
    clearUser,
  }
}, {
  persist: [
    {
      pick: ["user"],
      storage: localStorage,
    },
  ],
})
