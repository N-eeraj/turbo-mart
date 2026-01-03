const COLUMNS = [
  {
    id: "name",
    header: "Name",
  },
  {
    id: "email",
    header: "Email",
  },
  {
    id: "createdAt",
    header: "Joined On",
  },
  {
    id: "id",
    header: "Actions",
  },
]

export default function useAdminListData() {
  const permissionsFilter = useRouteQuery<Array<string>>("permissions-filter", [])
  const additionalQueries = computed(() => ({
    filters: {
      permissions: permissionsFilter.value,
    }
  }))

  const resourceList = useResourceListData({
    key: "admin-list",
    endpoint: "/super-admin/admin",
    query: additionalQueries,
    onError: () => navigateTo("/"),
  })

  watchDebounced(
    () => permissionsFilter.value,
    () => {
      resourceList.page.value = 1
      resourceList.refresh()
    },
    {
      debounce: 500,
    }
  )

  const {
    data: permissions,
    isLoadingPermissions: isLoadingPermissions,
  } = useAdminPermissions()
  const stringMappedPermissions = computed(() => (permissions.value ?? [])
    .map((permission) => ({ value: String(permission.value), textValue: permission.textValue }))
  )

  const {
    showConfirmation: showDeleteConfirmation,
    confirm: confirmDelete,
    cancel: cancelDelete,
    onDelete,
  } = useAdminDelete()

  const deletingIds = ref<Array<AdminObject["id"]>>([])

  const handleDelete = async (id: AdminObject["id"]) => {
    await onDelete(
      id,
      {
        onConfirm: () => deletingIds.value.push(id),
        onSuccess: () => resourceList.refresh(),
      }
    )
    deletingIds.value = deletingIds.value.filter((adminId) => adminId !== id)
  }

  return {
    ...resourceList,
    permissionsFilter,
    columns: COLUMNS,
    permissions: stringMappedPermissions,
    isLoadingPermissions,
    handleDelete,
    showDeleteConfirmation,
    deletingIds,
    confirmDelete,
    cancelDelete,
  }
}
