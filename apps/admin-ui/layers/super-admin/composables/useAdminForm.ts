import {
  toast,
} from "vue-sonner"
import type z from "zod"

import {
  adminCreationSchema,
} from "@app/schemas/admin/user"

interface Parameters {
  initialValues: Record<string, unknown>
  submitHandler: (_body: any) => Promise<ApiSuccess>
}

export default function useAdminForm({ submitHandler, initialValues = {} }: Parameters) {
  const {
    handleSubmit,
    isSubmitting,
    isFieldValid,
    setErrors,
  } = useForm({
    validationSchema: toTypedSchema(
      adminCreationSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>
    ),
    initialValues,
  })

  const {
    data: permissions,
    isLoadingPermissions: isLoadingPermissions,
  } = useAdminPermissions()

  const isInvalid = computed(() => !isFieldValid("name") || !isFieldValid("email") || !isFieldValid("permissions"))

  const onSubmit = handleSubmit(async (body) => {
    try {
      const {
        message,
      } = await submitHandler(body)
      toast.success(message)
    } catch (error: unknown) {
      const {
        status,
        message,
        errors,
      } = error as ApiError
      if (status === 422 || status === 409) {
        setErrors(errors as Record<string, Array<string>>)
      } else if (message) {
        toast.error(message, {
          richColors: true,
        })
      }
    }
  })

  return {
    permissions,
    isLoadingPermissions,
    isInvalid,
    isSubmitting,
    onSubmit,
  }
}
