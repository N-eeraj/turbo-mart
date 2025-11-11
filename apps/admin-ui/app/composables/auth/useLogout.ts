import { toast } from "vue-sonner"
import { type ModelRef } from "vue"

export default function useLogout(open: ModelRef<boolean>) {
  const {
    clearUser,
  } = useUserStore()
  
  const router = useRouter()
  
  const loading = ref(false)
  
  async function handleLogout() {
    loading.value = true
    try {
      const {
        message,
      } = await useApi("/auth/logout", {
        method: "POST",
      })
      open.value = false
      toast(message, {
        richColors: true,
      })
      clearUser()
      router.replace("/login")
    } catch (error: unknown) {
      const {
        message,
      } = error as ApiError
      toast.error(message, {
        richColors: true,
      })
    } finally {
      loading.value = false
    }
  }

  return {
    open,
    loading,
    handleLogout,
  }
}
