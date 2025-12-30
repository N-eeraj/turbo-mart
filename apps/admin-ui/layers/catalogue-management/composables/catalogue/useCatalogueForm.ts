import {
  toast,
} from "vue-sonner"
import type z from "zod"

import {
  categoryCreationSchema,
} from "@app/schemas/admin/catalogue/category"

interface Parameters {
  initialValues: Record<string, unknown>
  submitHandler: (_body: any) => Promise<ApiSuccess>
}

export default function useCatalogueForm({ submitHandler, initialValues = {} }: Parameters) {
  const {
    handleSubmit,
    isSubmitting,
    isFieldValid,
    setErrors,
  } = useForm({
    validationSchema: toTypedSchema(
      categoryCreationSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>
    ),
    initialValues,
  })

  const isInvalid = computed(() => !isFieldValid("name") || !isFieldValid("slug"))

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
    isInvalid,
    isSubmitting,
    onSubmit,
  }
}
