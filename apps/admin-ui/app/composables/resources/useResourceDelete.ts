import {
  toast,
} from "vue-sonner"

export interface DeleteResourceOptions {
  onSuccess?: (_response: globalThis.ApiSuccess) => void
  onConfirm?: () => void
  onCancel?: () => void
}

export default function useResourceDelete() {
  const {
    isRevealed,
    reveal,
    confirm,
    cancel,
  } = useConfirmDialog()

  const isLoading = ref(false)

  const onDelete = async (endpoint: string, {
    onSuccess,
    onConfirm,
    onCancel,
  }: DeleteResourceOptions = {}) => {
    const { isCanceled } = await reveal()
    if (isCanceled) return onCancel?.()
    onConfirm?.()
    try {
      isLoading.value = true
      const response = await useApi(endpoint, {
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
