export default function useAdminData() {
  const route = useRoute()

  const adminId = computed(() => route.params.id)

  const {
    data,
    status,
  } = useLazyAsyncData(
    `admin-${adminId.value}`,
    () => useApi(`/super-admin/admin/${adminId.value}`),
    {
      transform: ({ data }) => data,
    }
  )

  const isLoading = computed(() => status.value === "pending")

  return {
    adminId,
    data,
    isLoading,
  }
}
