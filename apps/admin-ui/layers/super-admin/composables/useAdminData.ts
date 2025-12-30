import type {
  Permissions,
} from "@app/database/mongoose/enums/admin/user"

export interface AdminDataObject extends Omit<AdminObject, "permissions"> {
  permissions: Array<{
    name: string
    value: Permissions
  }>
}

export default function useAdminData() {
  const route = useRoute()
  const adminId = computed(() => route.params.id)

  const {
    data,
    isLoading,
  } = useResourceData<AdminDataObject>({
    key: `admin-${adminId.value}`,
    endpoint: `/super-admin/admin/${adminId.value}`,
    onError: () => navigateTo("/admins"),
  })

  const permissionMappedData = computed(() => ({
    ...data.value,
    permissions: (data.value?.permissions ?? []).map(({ value }) => value),
  }))

  return {
    adminId,
    data,
    isLoading,
    permissionMappedData,
  }
}
