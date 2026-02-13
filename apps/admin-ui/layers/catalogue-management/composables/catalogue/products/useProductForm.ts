import {
  toast,
} from "vue-sonner"
import type z from "zod"

import {
  productCreationSchema,
} from "@app/schemas/admin/catalogue/product"

interface EmitsParameter {
  submit: [unknown]
}

export default function useProductForm(emit: EmitsParameter) {
  const route = useRoute()
  const productId = computed(() => route.params?.id)

  const {
    handleSubmit,
    isSubmitting,
    isFieldValid,
    setValues,
    setErrors,
  } = useForm({
    validationSchema: toTypedSchema(
      productCreationSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>
    ),
  })

  const {
    data: productData,
    status: productDataStatus,
  } = useLazyAsyncData(
    `fetch-product-${productId.value}`,
    () => useApi(`/admin/catalogue/products/${productId.value}`),
    {
      immediate: !!productId.value,
      transform: ({ data }) => data,
    }
  )
  const isLoadingProductData = computed(() => productDataStatus.value === "pending")

  watch(() => productData.value, (data) => {
    setValues(data ?? {})
  })

  const {
    subcategories,
    isLoading: isLoadingSubcategories,
    hasNextPage: hasNextSubcategoriesPage,
    loadMore: loadMoreSubcategories,
    search: subcategorySearch,
  } = useInfiniteSubcategorySelect()

  const {
    brands,
    isLoading: isLoadingBrands,
    hasNextPage: hasNextBrandsPage,
    loadMore: loadMoreBrands,
    search: brandSearch,
  } = useInfiniteBrandSelect()

  const isInvalid = computed(() => !isFieldValid("name")
    || !isFieldValid("subcategory")
    || !isFieldValid("brand")
  )

  const onSubmit = handleSubmit(async (body) => {
    const endpoint = productId.value ? `/admin/catalogue/products/${productId.value}` : "/admin/catalogue/products"
    const method = productId.value ? "PATCH" : "POST"

    try {
      const {
        data,
        message,
      } = await useApi(endpoint, {
        method,
        body,
      })
      emit("submit", data)
      toast.success(message)
    } catch (error: unknown) {
      const {
        status,
        message,
        errors,
      } = error as ApiError
      if ((status === 422 || status === 409) && errors) {
        setErrors(errors as Record<string, Array<string>>)
      } else if (message) {
        toast.error(message, {
          richColors: true,
        })
      }
    }
  })

  return {
    isLoadingProductData,
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
