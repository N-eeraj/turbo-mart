import {
  toast,
} from "vue-sonner"

interface Options {
  onSuccess?: (_response: globalThis.ApiSuccess) => void
  onConfirm?: () => void
  onCancel?: () => void
}

export default function useAdminDelete() {
  const {
    isRevealed,
    reveal,
    confirm,
    cancel,
  } = useConfirmDialog()

  const isLoading = ref(false)

  const onDelete = async (id: AdminObject["id"], {
    onSuccess,
    onConfirm,
    onCancel,
  }: Options = {}) => {
    const { isCanceled } = await reveal()
    if (isCanceled) return onCancel?.()
    onConfirm?.()
    try {
      isLoading.value = true
      const response = await useApi(`/super-admin/admin/${id}`, {
        method: "DELETE",
      })
      toast.success(response.message)
      onSuccess?.(response)
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
