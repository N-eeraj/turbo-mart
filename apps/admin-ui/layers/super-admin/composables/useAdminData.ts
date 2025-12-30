import {
  toast,
} from "vue-sonner"
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
    status,
    error,
  } = useLazyAsyncData(
    `admin-${adminId.value}`,
    () => useApi(`/super-admin/admin/${adminId.value}`),
    {
      transform: ({ data }) => data as AdminDataObject,
    }
  )

  const isLoading = computed(() => status.value === "pending")

  watch(() => error.value, (error) => {
    if (
      error?.cause
      && typeof error?.cause === "object" 
      && "message" in error?.cause
      && typeof error.cause.message === "string"
    ) {
      toast.error(error.cause.message)
    } else {
      toast.error("Oops! Something went wrong")
    }
    navigateTo("/admins")
  })

  const permissionMappedData = computed(() => {
    return {
      ...data.value,
      permissions: (data.value?.permissions ?? []).map(({ value }) => value),
    }
  })

  return {
    adminId,
    data,
    isLoading,
    permissionMappedData,
  }
}
