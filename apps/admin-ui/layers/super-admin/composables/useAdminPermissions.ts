export interface PermissionMap {
  name: string
  value: Permissions
}

export default function useAdminPermissions() {
  const {
    data,
    status,
  } = useLazyAsyncData(
    "admin-permissions",
    () => useApi("/super-admin/admin/permissions"),
    {
      transform: ({ data }) => (data as Array<PermissionMap>)
        .map(({ name, value }) => ({
          textValue: name,
          value,
        })),
      default: () => ([]),
    }
  )
  const isLoadingPermissions = computed(() => status.value === "pending")

  return {
    data,
    isLoadingPermissions,
  }
}
