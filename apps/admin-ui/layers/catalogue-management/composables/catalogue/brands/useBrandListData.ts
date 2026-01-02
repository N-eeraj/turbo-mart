import {
  type BrandCreationData,
} from "@app/schemas/admin/catalogue/brand"

interface Brand extends BrandCreationData {
  id: string
  createdAt: Date
  updatedAt: Date
}

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

export default function useBrandListData({ persistQuery = true } = {}) {
  const resourceList = useResourceListData<Brand>({
    key: "brands-list",
    endpoint: "/admin/catalogue/brands",
    onError: () => navigateTo("/"),
    persistQuery,
  })

  const {
    showConfirmation: showDeleteConfirmation,
    confirm: confirmDelete,
    cancel: cancelDelete,
    onDelete,
  } = useBrandDelete()

  const deletingIds = ref<Array<string>>([])

  const handleDelete = async (id: string) => {
    await onDelete(
      id,
      {
        onConfirm: () => deletingIds.value.push(id),
        onSuccess: () => resourceList.refresh(),
      }
    )
    deletingIds.value = deletingIds.value.filter((brandId) => brandId !== id)
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
