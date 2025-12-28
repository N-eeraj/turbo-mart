import {
  toast,
} from "vue-sonner"

export default function useAdminDelete() {
  const route = useRoute()
  const router = useRouter()

  const {
    isRevealed,
    reveal,
    confirm,
    cancel,
  } = useConfirmDialog()

  const isLoading = ref(false)

  const onDelete = async () => {
    const { isCanceled } = await reveal()
    if (isCanceled) return
    try {
      isLoading.value = true
      const {
        message,
      } = await useApi(`/super-admin/admin/${route.params.id}`, {
        method: "DELETE",
      })
      toast.success(message)
      router.replace("/admin")
    } catch (error: unknown) {
      const {
        message,
      } = error as ApiError
      toast.error(message)
    } finally {
      isLoading.value = false
    }
  }

  return {
    showConfirmation: isRevealed,
    isLoading,
    onDelete,
    confirm,
    cancel,
  }
}
