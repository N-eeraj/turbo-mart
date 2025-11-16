import {
  toast,
} from "vue-sonner"
import {
  resetPasswordWithConfirmSchema,
} from "@app/schemas/admin/auth"
import type z from "zod"

export default function useResetPassword(token: ComputedRef<string>) {
  const router = useRouter()

  const {
    handleSubmit,
    errors,
    isSubmitting,
    setFieldError,
    setErrors,
  } = useForm({
    validationSchema: toTypedSchema(
      resetPasswordWithConfirmSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>,
    ),
    initialValues: {
      token: token.value,
    },
  })

  const onSubmit = handleSubmit(async (body) => {
    try {
      const {
        message,
      } = await useApi("/auth/reset-password", {
        method: "POST",
        body,
      })

      toast.success(message, {
        richColors: true,
        description: "You can now login with your new password",
      })
      router.push("/login")
    } catch (error: unknown) {
      const {
        status,
        message,
        errors,
      } = error as ApiError
      if (status === 422 && errors) {
        setErrors(errors as Record<string, Array<string>>)
      } else if (status === 404 && message) {
        setFieldError("token", message)
      } else if (message) {
        toast.error(message, {
          richColors: true,
        })
      }
    }
  })

  return {
    isSubmitting,
    errors,
    onSubmit,
  }
}
