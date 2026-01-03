import {
  toast,
} from "vue-sonner"
import type z from "zod"

import {
  productCreationSchema,
} from "@app/schemas/admin/catalogue/product"
import {
  type SubcategoryCreationData,
} from "@app/schemas/admin/catalogue/subcategory"
import {
  type BrandCreationData,
} from "@app/schemas/admin/catalogue/brand"

interface ProductSubcategory extends SubcategoryCreationData {
  id: string
}

interface ProductBrand extends BrandCreationData {
  id: string
}

interface Parameters {
  initialValues: Record<string, unknown>
  submitHandler: (_body: any) => Promise<ApiSuccess>
}

export default function useProductForm({ submitHandler, initialValues = {} }: Parameters) {
  const initialSubcategory = computed<ProductSubcategory | undefined>(() => {
    if (!initialValues.subcategory) return undefined
    return initialValues.subcategory as ProductSubcategory
  })

  const initialBrand = computed<ProductBrand | undefined>(() => {
    if (!initialValues.brand) return undefined
    return initialValues.brand as ProductBrand
  })

  const {
    handleSubmit,
    isSubmitting,
    isFieldValid,
    setErrors,
  } = useForm({
    validationSchema: toTypedSchema(
      productCreationSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>
    ),
    initialValues: {
      ...initialValues,
      subcategory: initialSubcategory.value?.id,
      brand: initialBrand.value?.id,
    },
  })

  const {
    subcategories,
    isLoading: isLoadingSubcategories,
    hasNextPage: hasNextSubcategoriesPage,
    loadMore: loadMoreSubcategories,
    search: subcategorySearch,
  } = useInfiniteSubcategorySelect(initialSubcategory)

  const {
    brands,
    isLoading: isLoadingBrands,
    hasNextPage: hasNextBrandsPage,
    loadMore: loadMoreBrands,
    search: brandSearch,
  } = useInfiniteBrandSelect(initialBrand)

  const isInvalid = computed(() => !isFieldValid("name")
    || !isFieldValid("subcategory")
    || !isFieldValid("brand")
  )

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
    isSubmitting,
    subcategories,
    subcategorySearch,
    isLoadingSubcategories,
    hasNextSubcategoriesPage,
    loadMoreSubcategories,
    brands,
    brandSearch,
    isLoadingBrands,
    hasNextBrandsPage,
    loadMoreBrands,
    isInvalid,
    onSubmit,
  }
}
