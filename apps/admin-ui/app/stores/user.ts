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
function getAuthToken(): Token["value"] | null {
  const cookies = document.cookie.split("; ").find(row => row.startsWith(AUTH_TOKEN_KEY + "="))
  if (!cookies) return null
  const [_, value] = cookies.split("=")
  return value ?? null
}
function setAuthToken({ value, expiresAt }: Token) {
  const exp = new Date(expiresAt)
  const seconds = Math.max(0, Math.floor((exp.getTime() - Date.now()) / 1000))
  document.cookie = `${AUTH_TOKEN_KEY}=${value}; max-age=${seconds}; path=/`
}
function removeAuthToken() {
  document.cookie = `${AUTH_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}

export const useUserStore = defineStore("user", () => {
  const user = ref<AdminObject | null>()
  const token = ref<Token["value"] | null>(getAuthToken())

  const setUser = (data: AdminObject) => user.value = data
  const setToken = (tkn: Token) => {
    token.value = tkn.value
    setAuthToken(tkn)
  }

  const clearUser = () => {
    user.value = null
    token.value = null
    removeAuthToken()
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
