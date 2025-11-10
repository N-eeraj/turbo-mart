export default function useInitialLoad() {
  const router = useRouter()

  const userStore = useUserStore()
  const {
    setUser,
    clearUser,
  } = userStore
  const {
    isLoggedIn,
  } = storeToRefs(userStore)
  
  const {
    status,
    pending,
    error,
    refresh,
  } = useAsyncData(
    "server-ping",
    () => useApi("/ping"),
  )
  
  const refreshUser = async () => {
    try {
      const {
        data,
      } = await useApi("/profile")
      setUser(data as Parameters<typeof setUser>[0])
    } catch (error: unknown) {
      const {
        status,
      } = error as ApiError
      if (status === 401) {
        clearUser()
        router.replace("/login")
      }
    }
  }
  
  watch(() => status.value, (status) => {
    if (status === "success" && isLoggedIn.value) {
      refreshUser()
    }
  })

  return {
    pending,
    error,
    refresh,
  }
}
