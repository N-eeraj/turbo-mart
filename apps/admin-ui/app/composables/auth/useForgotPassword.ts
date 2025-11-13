import {
  type ModelRef,
} from "vue"
import type z from "zod"

import {
  forgotPasswordSchema,
} from "@app/schemas/admin/auth"

export default function useForgotPassword(
  open: ModelRef<boolean>,
  email: ComputedRef<string | undefined>
) {
  const {
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    isFieldValid,
    setFieldError,
    setErrors,
    resetForm,
  } = useForm({
    validationSchema: toTypedSchema(
      forgotPasswordSchema.pick({
        email: true,
      }) as unknown as z.ZodType<any, z.ZodTypeDef, any>,
    ),
  })

  const isLoading = ref(false)
  const isSuccess = ref(false)

  watch(() => open.value, async (open) => {
    if (open) {
      isSuccess.value = false
      setFieldValue("email", email.value)
      setTimeout(() => {
        setFieldTouched("email", false)
        setFieldError("email", undefined)
      }, 50)
    }
  })

  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      isLoading.value = true
      const {
        message,
      } = await useApi("/auth/forgot-password", {
        method: "POST",
        body: {
          email,
          redirectUrl: `${location.origin}/reset-password`,
        },
      })

      isSuccess.value = true
      resetForm()
    } catch (error: unknown) {
      const {
        message,
        errors,
      } = error as ApiError
      if (errors) {
        setErrors(errors as Record<string, Array<string>>)
      } else if (message) {
        setFieldError("email", message)
      }
    } finally {
      isLoading.value = false
    }
  })

  const isInvalid = computed(() => !isFieldValid('email'))

  return {
    isLoading,
    isInvalid,
    isSuccess,
    onSubmit,
  }
}
