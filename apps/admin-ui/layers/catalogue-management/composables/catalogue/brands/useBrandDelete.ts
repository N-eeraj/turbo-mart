export default function useBrandDelete() {
  const {
    onDelete,
    ...deleteResource
  } = useResourceDelete()

  const handleDelete = (id: string, options: DeleteResourceOptions) =>
      onDelete(`/admin/catalogue/brands/${id}`, options)

  return {
    ...deleteResource,
    onDelete: handleDelete,
  }
}
