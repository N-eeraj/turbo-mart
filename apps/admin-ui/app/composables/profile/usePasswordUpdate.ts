import {
  toast,
} from "vue-sonner"
import type z from "zod"

import {
  passwordUpdateWithConfirmSchema,
} from "@app/schemas/admin/user"

export default function usePasswordUpdate() {
  const {
    isSubmitting,
    handleSubmit,
    setErrors,
  } = useForm({
    validationSchema: toTypedSchema(
      passwordUpdateWithConfirmSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>,
    ),
  })
  
  const onSubmit = handleSubmit(async ({ password, newPassword }) => {
    try {
      const {
        message,
      } = await useApi("/profile/password", {
        method: "PATCH",
        body: {
          password,
          newPassword,
        },
      })
      toast.success(message)
    } catch (error: unknown) {
      const {
        message,
        errors,
      } = error as ApiError
      if (errors) {
        setErrors(errors as Record<string, Array<string>>)
      } else if (message) {
        toast.error(message)
      }
    }
  })

  return {
    isSubmitting,
    onSubmit,
  }
}
