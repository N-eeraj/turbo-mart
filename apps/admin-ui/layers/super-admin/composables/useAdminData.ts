import {
  toast,
} from "vue-sonner"

export default function useAdminData() {
  const route = useRoute()

  const adminId = computed(() => route.params.id)

  const {
    data,
    status,
    error,
  } = useLazyAsyncData(
    `admin-${adminId.value}`,
    () => useApi(`/super-admin/admin/${adminId.value}`),
    {
      transform: ({ data }) => data,
    }
  )

  const isLoading = computed(() => status.value === "pending")

  watch(() => error.value, (error) => {
    toast.error(error?.cause?.message ?? "Oops! Something went wrong")
    navigateTo(`/admin`)
  })

  return {
    adminId,
    data,
    isLoading,
  }
}
