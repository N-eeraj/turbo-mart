const COLUMNS = [
  {
    id: "name",
    header: "Name",
  },
  {
    id: "slug",
    header: "Slug",
  },
  {
    id: "createdAt",
    header: "Created On",
  },
  {
    id: "updatedAt",
    header: "Last Updated",
  },
  {
    id: "id",
    header: "Actions",
  },
]

export default function useCategoryListData() {
  const resourceList = useResourceListData({
    key: "categories-list",
    endpoint: "/admin/catalogue/categories",
    onError: () => navigateTo("/"),
  })

  const {
    showConfirmation: showDeleteConfirmation,
    confirm: confirmDelete,
    cancel: cancelDelete,
    onDelete,
  } = useCategoryDelete()

  const deletingIds = ref<Array<string>>([])

  const handleDelete = async (id: string) => {
    await onDelete(
      id,
      {
        onConfirm: () => deletingIds.value.push(id),
        onSuccess: () => resourceList.refresh(),
      }
    )
    deletingIds.value = deletingIds.value.filter((categoryId) => categoryId !== id)
  }

  return {
    ...resourceList,
    columns: COLUMNS,
    handleDelete,
    showDeleteConfirmation,
    deletingIds,
    confirmDelete,
    cancelDelete,
  }
}
