import {
  toast,
} from "vue-sonner"
import type z from "zod"
import {
  type SelectItemProps,
} from "reka-ui"

import {
  subcategoryCreationSchema,
} from "@app/schemas/admin/catalogue/subcategory"
import {
  type CategoryCreationData,
} from "@app/schemas/admin/catalogue/category"

interface SubcategoryCategory extends CategoryCreationData {
  id: string
}

interface Parameters {
  initialValues: Record<string, unknown>
  submitHandler: (_body: any) => Promise<ApiSuccess>
}

export default function useSubcategoryForm({ submitHandler, initialValues = {} }: Parameters) {
  const initialCategory = computed<SubcategoryCategory | undefined>(() => {
    if (!initialValues.category) return undefined
    return initialValues.category as SubcategoryCategory
  })

  const {
    handleSubmit,
    isSubmitting,
    isFieldValid,
    setErrors,
  } = useForm({
    validationSchema: toTypedSchema(
      subcategoryCreationSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>
    ),
    initialValues: {
      ...initialValues,
      category: initialCategory.value?.id,
    },
  })

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    page,
    hasNextPage,
    search: categorySearch,
  } = useCategoryListData()

  const categories = ref<Array<SelectItemProps>>(
    initialCategory.value
      ? [
        {
          value: initialCategory.value.id,
          textValue: initialCategory.value.name,
        }
      ]
      : []
  )

  watch(() => categoriesData.value, () => {
    if (!categoriesData.value) return
    categories.value = categoriesData.value
      .map(({ id, name }) => ({
        value: id,
        textValue: name,
      }))
  })

  const isInvalid = computed(() => !isFieldValid("name") || !isFieldValid("slug")) || !isFieldValid("category")

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
    categorySearch,
    isInvalid,
    isSubmitting,
    onSubmit,
  }
}
