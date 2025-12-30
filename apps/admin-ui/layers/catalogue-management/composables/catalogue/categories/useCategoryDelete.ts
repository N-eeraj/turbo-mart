export default function useCategoryDelete() {
  const {
    onDelete,
    ...deleteResource
  } = useResourceDelete()

  const handleDelete = (id: string, options: DeleteResourceOptions) =>
      onDelete(`/admin/catalogue/categories/${id}`, options)

  return {
    ...deleteResource,
    onDelete: handleDelete,
  }
}
