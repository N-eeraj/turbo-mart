import type z from "zod"

import {
  adminCreationSchema,
} from "@app/schemas/admin/user"
interface PermissionMap {
  name: string
  value: Permissions
}

export default function useAdminForm() {
  const {
    handleSubmit,
    isSubmitting,
    isFieldValid,
    setErrors,
    resetForm,
  } = useForm({
    validationSchema: toTypedSchema(
      adminCreationSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>
    ),
  })
  
  const {
    data: permissions,
    status: loadingPermissions,
  } = useLazyAsyncData(
    "admin-permissions",
    () => useApi("/super-admin/admin/permissions"),
    {
      transform: ({ data }) => (data as Array<PermissionMap>)
        .map(({ name, value }) => ({
          textValue: name,
          value,
        })),
      default: () => ([]),
    }
  )
  const isLoadingPermissions = computed(() => loadingPermissions.value === "pending")
  
  const isInvalid = computed(() => !isFieldValid("name") || !isFieldValid("email") || !isFieldValid("permissions"))
  
  const onSubmit = handleSubmit(async (body) => {
    console.log(body)
  })

  return {
    permissions,
    isLoadingPermissions,
    isInvalid,
    isSubmitting,
    onSubmit,
  }
}
