import {
  toast,
} from "vue-sonner"

export default function useCategoryData() {
  const route = useRoute()

  const categoryId = computed(() => route.params.id)

  const {
    data,
    status,
    error,
  } = useLazyAsyncData(
    `category-${categoryId.value}`,
    () => useApi(`/admin/catalogue/categories/${categoryId.value}`),
    {
      transform: ({ data }) => data as AdminDataObject,
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
    navigateTo("/catalogue/categories")
  })

  return {
    categoryId,
    data,
    isLoading,
  }
}
