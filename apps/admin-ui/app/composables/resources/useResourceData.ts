import {
  toast,
} from "vue-sonner"

interface Options {
  key: string
  endpoint: string
  onError: Function
}

export default function useResourceData<T = unknown>({ key, endpoint, onError }: Options) {
  const {
    data,
    status,
    error,
  } = useLazyAsyncData(
    key,
    () => useApi(endpoint),
    {
      transform: ({ data }) => data as T,
    }
  )

  const isLoading = computed(() => status.value === "pending")

  watch(() => error.value, (error) => {
    if (
      error?.cause
      && typeof error?.cause === "object" 
      && "message" in error?.cause
      && typeof error.cause.message === "string"
    ) {
      toast.error(error.cause.message)
    } else {
      toast.error("Oops! Something went wrong")
    }
    onError?.()
  })

  return {
    data,
    isLoading,
  }
}
