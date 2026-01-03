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
  const categoriesFilter = ref<Array<string>>([])
  const categoriesFilterQuery = useRouteQuery<Array<string> | string>("categories-filter", [])
  const additionalQueries = computed(() => ({
    categories: categoriesFilter.value,
  }))

  const resourceList = useResourceListData({
    key: "subcategories-list",
    endpoint: "/admin/catalogue/subcategories",
    query: additionalQueries,
    onError: () => navigateTo("/"),
  })

  watch(
    () => categoriesFilterQuery.value,
    (categoriesFilterQuery) => {
      if (Array.isArray(categoriesFilterQuery)) {
        categoriesFilter.value = categoriesFilterQuery
      } else {
        categoriesFilter.value = [categoriesFilterQuery]
      }
    },
    {
      immediate: true,
    }
  )
  watchDebounced(
    () => categoriesFilter.value,
    () => {
      categoriesFilterQuery.value = categoriesFilter.value
      resourceList.page.value = 1
      resourceList.refresh()
    },
    {
      debounce: 500,
      deep: true,
    }
  )

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
    categoriesFilter,
    handleDelete,
    showDeleteConfirmation,
    deletingIds,
    confirmDelete,
    cancelDelete,
  }
}
