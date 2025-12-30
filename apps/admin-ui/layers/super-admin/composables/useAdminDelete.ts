export default function useAdminDelete() {
  const {
    onDelete,
    ...deleteResource
  } = useResourceDelete()

  const handleDelete = (id: string, options: DeleteResourceOptions) =>
      onDelete(`/super-admin/admin/${id}`, options)

  return {
    ...deleteResource,
    onDelete: handleDelete,
  }
}
