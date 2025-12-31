export default function useSubcategoryDelete() {
  const {
    onDelete,
    ...deleteResource
  } = useResourceDelete()

  const handleDelete = (id: string, options: DeleteResourceOptions) =>
      onDelete(`/admin/catalogue/subcategories/${id}`, options)

  return {
    ...deleteResource,
    onDelete: handleDelete,
  }
}
