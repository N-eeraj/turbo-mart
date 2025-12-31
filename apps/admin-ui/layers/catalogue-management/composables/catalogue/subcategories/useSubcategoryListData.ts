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
    id: "category",
    header: "Category",
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

export default function useSubcategoryListData() {
  const resourceList = useResourceListData({
    key: "subcategories-list",
    endpoint: "/admin/catalogue/subcategories",
    onError: () => navigateTo("/"),
  })

  const {
    showConfirmation: showDeleteConfirmation,
    confirm: confirmDelete,
    cancel: cancelDelete,
    onDelete,
  } = useSubcategoryDelete()

  const deletingIds = ref<Array<string>>([])

  const handleDelete = async (id: string) => {
    await onDelete(
      id,
      {
        onConfirm: () => deletingIds.value.push(id),
        onSuccess: () => resourceList.refresh(),
      }
    )
    deletingIds.value = deletingIds.value.filter((subcategoryId) => subcategoryId !== id)
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
