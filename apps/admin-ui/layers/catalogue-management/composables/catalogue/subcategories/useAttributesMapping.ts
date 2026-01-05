import {
  toast,
} from "vue-sonner"
import type z from "zod"

import {
  subcategoryAttributeUpdateSchema,
} from "@app/schemas/admin/catalogue/subcategory"

export default function useAttributesMapping() {
  const route = useRoute()
  const subcategorySlug = computed(() => route.params.slug)

  const subcategoryLink = computed(() => `/catalogue/subcategories/${subcategorySlug.value}`)
  const {
    data: subcategoryData,
  } = inject(`subcategory-${subcategorySlug.value}`)

  const {
    data: attributeTypes,
    status: loadingAttributeTypes,
  } = useLazyAsyncData(
    "attribute-types",
    () => useApi(`/admin/catalogue/subcategories/attribute-types`),
    {
      transform: ({ data }) => data
      .map(({ value, name }) => ({
        value,
        textValue: name,
      })),
    }
  )
  const isLoadingAttributeTypes = computed(() => loadingAttributeTypes.value === "pending")

  const {
    handleSubmit,
    isSubmitting,
    isFieldValid,
    setErrors,
    values,
    errors,
  } = useForm({
    validationSchema: toTypedSchema(
      subcategoryAttributeUpdateSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>
    ),
    initialValues: {
      create: [],
      update: subcategoryData.value.attributes,
      delete: [],
    },
  })

  const {
    fields: createAttributeFields,
    push: createAttributePush,
    remove: createAttributeRemove,
  } = useFieldArray("create")

  const {
    fields: updateAttributeFields,
    remove: updateAttributeRemove,
  } = useFieldArray("update")

  const {
    push: deleteAttributePush,
  } = useFieldArray("delete")

  const removeAttribute = (index: number) => {
    updateAttributeRemove(index)
    deleteAttributePush("")
  }

  const onSubmit = handleSubmit(async (body) => {
    try {
      const {
        message,
      } = await useApi(`/admin/catalogue/subcategories/${subcategoryData.value.id}/attributes`,{
        method: "PATCH",
        body,
      })
      toast.success(message)
      navigateTo(subcategoryLink.value)
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
    attributeTypes,
    isLoadingAttributeTypes,
    isSubmitting,
    createAttributeFields,
    createAttributePush,
    createAttributeRemove,
    updateAttributeFields,
    removeAttribute,
    onSubmit,
    subcategoryLink,
    values,
    errors,
  }
}
