import {
  toast,
} from "vue-sonner"
import {
  type ComputedGetter,
  type ModelRef,
} from "vue"
import type z from "zod"

import {
  forgotPasswordSchema,
} from "@app/schemas/admin/auth"

export default function useForgotPassword(open: ModelRef<boolean>, email: ComputedRef<string>) {
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

      resetForm()
      open.value = false
      toast.success(message, {
        richColors: true,
      })
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

  watch(() => open.value, async (open) => {
    if (open) {
      setFieldValue("email", email.value)
      setTimeout(() => {
        setFieldTouched("email", false)
        setFieldError("email", undefined)
      }, 50)
    }
  })

  const isInvalid = computed(() => !isFieldValid('email'))

  return {
    isLoading,
    isInvalid,
    onSubmit,
  }
}
