import {
  toast,
} from "vue-sonner"
import type z from "zod"

import {
  subcategoryCreationSchema,
} from "@app/schemas/admin/catalogue/subcategory"

interface Parameters {
  initialValues: Record<string, unknown>
  submitHandler: (_body: any) => Promise<ApiSuccess>
}

export default function useSubcategoryForm({ submitHandler, initialValues = {} }: Parameters) {
  const {
    handleSubmit,
    isSubmitting,
    isFieldValid,
    setErrors,
  } = useForm({
    validationSchema: toTypedSchema(
      subcategoryCreationSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>
    ),
    initialValues,
  })

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    page,
    hasNextPage,
    search,
  } = useCategoryListData()
  const categories = ref([])
  watch(() => categoriesData.value, () => {
    if (!categoriesData.value) return
    categories.value = categoriesData.value
      .map(({ id, name }) => ({
        value: id,
        textValue: name,
      }))
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
    categories,
    isLoadingCategories,
    isInvalid,
    isSubmitting,
    onSubmit,
  }
}
