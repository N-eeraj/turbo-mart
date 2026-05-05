import z from "zod"
import {
  toast,
} from "vue-sonner"

import {
  productAttributeSchema,
  validateAttributeValue,
  type Product,
} from "@app/schemas/admin/catalogue/product"
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface EmitsParameter {
  submit: []
}

type ProductInfo = Pick<Product, "subcategory" | "attributes"> & {
  id: string
}
interface FormValue {
  value: unknown
}
interface FormData {
  properties: Array<FormValue & Record<string, unknown>>
  variants: Array<Record<string, unknown> & {
    values: Array<FormValue>
  }>
}
interface AttributeValueValidation {
  value: unknown
  type: AttributeType
  required: AttributeObject<AttributeType>["required"]
  metadata: AttributeObject<AttributeType>["metadata"]
  basePath: string
}

export const ATTRIBUTES_WITH_READONLY_LABEL: Array<AttributeType> = [
  AttributeType.DATE
]
export const ATTRIBUTES_WITH_LABEL_INPUT: Array<AttributeType> = [
  AttributeType.NUMBER,
  AttributeType.COLOR,
  ...ATTRIBUTES_WITH_READONLY_LABEL,
] as const
export const ATTRIBUTE_WITH_META = [
  AttributeType.NUMBER,
  AttributeType.DATE,
] as const
export type AttributesWithMeta = typeof ATTRIBUTE_WITH_META[number]
export const ATTRIBUTE_VALUE_META: Record<AttributesWithMeta, Record<string, any>> = {
  [AttributeType.NUMBER]: {
    unit: "",
  },
  [AttributeType.DATE]: {
    format: "",
  },
} as const

function convertAttributeValue(
  value: FormValue["value"],
  type: AttributeType,
) {
  switch (type) {
    case AttributeType.NUMBER:
      if (value == null || value === "") return null
      const num = Number(value)
      return isNaN(num) ? null : num
    case AttributeType.BOOLEAN:
      if (value == null || value === "") return null
      return value === "true"
    default:
      return value
  }
}

/**
 * Runs attribute value validation and reports any resulting issues to the given Zod refinement context.
 *
 * Uses `validateAttributeValue` to check the provided value and, if invalid,
 * adds one or more issues to `ctx` with appropriate error messages and paths.
 *
 * @param ctx - Zod refinement context used to collect validation issues.
 * @param params - Validation parameters.
 * @param params.value - The value to validate.
 * @param params.type - The expected attribute type.
 * @param params.required - Whether the value is required.
 * @param params.metadata - Additional metadata used during validation.
 * @param params.basePath - Base path used to construct issue paths in the context.
 */
function applyValidation(ctx: z.RefinementCtx, {
  value,
  type,
  required,
  metadata,
  basePath,
}: AttributeValueValidation) {
  const {
    isValid,
    error,
  } = validateAttributeValue(
    value,
    type,
    required,
    metadata,
  )

  if (isValid) return

  if (typeof error === "string") {
    ctx.addIssue({
      code: "custom",
      message: error,
      path: [basePath],
    })
    return
  }

  error.forEach((err, keyValueIndex) => {
    if (err.key) {
      ctx.addIssue({
        code: "custom",
        message: err.key,
        path: [`${basePath}[${keyValueIndex}].key`],
      })
    }

    if (err.value) {
      ctx.addIssue({
        code: "custom",
        message: err.value,
        path: [`${basePath}[${keyValueIndex}].value`],
      })
    }
  })
}

export default function useProductFormAttributes(emit: EmitsParameter) {
  const route = useRoute()
  const productId = computed(() => route.params?.id)

  const {
    data: productAttributes,
    status: productAttributesStatus,
  } = useLazyAsyncData(
    `fetch-product-${productId.value}-attributes`,
    () => useApi(`/admin/catalogue/products/${productId.value}`, {
      query: {
        fields: "attributes",
      },
    }),
    {
      transform: ({ data }) => data as ProductInfo,
    }
  )
  const isLoadingProductAttributes = computed(() => productAttributesStatus.value === "pending")

  const {
    data: subcategoryAttributes,
    status: subcategoryAttributesStatus,
    refresh: fetchSubcategoryAttributes,
  } = useLazyAsyncData(
    `${productAttributes.value?.subcategory}-attributes`,
    () => useApi(`/admin/catalogue/subcategories/${productAttributes.value?.subcategory}/attributes`),
    {
      immediate: false,
      transform: ({ data }) => data as Array<AttributeObject<AttributeType>>,
    }
  )
  const isLoadingSubcategoryAttributes = computed(() => subcategoryAttributesStatus.value === "pending")

  const subcategoryAttributesMap = computed(() => {
    const attributesList: Array<AttributeObject<AttributeType>> = subcategoryAttributes.value ?? []
    const lastRequiredAttributeIndices = {
      properties: 0,
      variants: 0,
    }
    const mappedAttributes = attributesList.reduce((
      attributeMap: Record<"properties" | "variants", Array<Omit<typeof attributesList[number], "variant">>>,
      { variant, ...attribute }
    ) => {
      const key: keyof typeof attributeMap = variant ? "variants" : "properties"

      // move required attributes to top
      if (attribute.required) {
        attributeMap[key].splice(lastRequiredAttributeIndices[key], 0, attribute)
        lastRequiredAttributeIndices[key] += 1
      } else {
        attributeMap[key].push(attribute)
      }

      return attributeMap
    }, {
      properties: [],
      variants: [],
    })
    return mappedAttributes
  })

  watch(() => productAttributes.value, (data) => {
    fetchSubcategoryAttributes()
    if (data?.attributes) {
      setValues(data.attributes)
    }
  })

  watch(() => subcategoryAttributesMap.value, (data) => {
    const {
      properties: existingProperties,
      variants: existingVariants,
    } = productAttributes.value?.attributes ?? {}

    const properties = data.properties.map(({ id, type }) => {
      const hasLabel = ATTRIBUTES_WITH_LABEL_INPUT.includes(type)
      const metaData = ATTRIBUTE_VALUE_META[type] ? { ...ATTRIBUTE_VALUE_META[type] } : undefined

      const existingPropertyValue = existingProperties
        ?.find((property) => property.attribute === String(id))
      if (existingPropertyValue) return existingPropertyValue

      let value: string | Array<string> = ""
      if (type === AttributeType.MULTI_SELECT || type === AttributeType.JSON) {
        value = []
      }

      return {
        attribute: id,
        value,
        ...(hasLabel ? { label: "" } : {}),
        ...(metaData ? { meta: metaData } : {}),
      }
    })

    const variants = data.variants.map(({ id }) => {
      const existingPropertyValue = existingVariants
        ?.find((variant) => variant.attribute === String(id))
      if (existingPropertyValue) return existingPropertyValue

      return {
        attribute: id,
        values: [],
      }
    })

    setValues({
      properties,
      variants,
    })
  })

  const getSubcategoryAttribute = (attributeId: string) => {
    return subcategoryAttributes.value?.find((attribute) => attribute.id as unknown as string === attributeId)
  }

  const preprocessFormData = (formData: unknown) => {
    const values = formData as FormData

    values.properties?.forEach((property) => {
      const attribute = getSubcategoryAttribute(property.attribute as string)
      if (!attribute) return
      property.value = convertAttributeValue(property.value, attribute.type)
      if (property.meta && typeof property.meta === "object") {
        if ("unit" in property.meta) {
          property.meta.unit = Number(property.meta.unit)
        }
        if ("format" in property.meta) {
          property.meta.format = Number(property.meta.format)
        }
      }
    })

    values.variants?.forEach((variant) => {
      const attribute = getSubcategoryAttribute(variant.attribute as string)
      if (!attribute) return
      variant.values = variant.values.map((variant) => ({
        ...variant,
        value: convertAttributeValue(variant.value, attribute.type),
      }))
    })

    return values
  }

  const {
    values,
    isSubmitting,
    handleSubmit,
    setValues,
    setFieldValue,
  } = useForm({
    validationSchema: toTypedSchema(
      z.preprocess(
        preprocessFormData,
        productAttributeSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>
      )
        .superRefine((formData, ctx) => {
          const values = formData as FormData

          values.properties?.forEach((property, index) => {
            const attribute = getSubcategoryAttribute(property.attribute as string)
            if (!attribute) return
            const {
              type,
              required,
              metadata,
            } = attribute
            applyValidation(ctx, {
              value: property.value,
              type,
              required,
              metadata,
              basePath: `properties[${index}].value`,
            })
          })

          values.variants?.forEach((variant, index) => {
            const attribute = getSubcategoryAttribute(variant.attribute as string)
            if (!attribute) return
            const {
              type,
              required,
              metadata,
            } = attribute
            variant.values.forEach(({ value }, variantIndex) => {
              applyValidation(ctx, {
                value,
                type,
                required,
                metadata,
                basePath: `variants[${index}].values[${variantIndex}].value`,
              })
            })
          })
        })
    ),
  })

  provide("product-form-attributes", {
    values,
    setFieldValue,
  })

  const onSubmit = handleSubmit(async (body) => {
    try {
      const {
        message,
      } = await useApi(`/admin/catalogue/products/${productId.value}/attributes`, {
        method: "PUT",
        body,
      })

      emit("submit")
      toast.success(message)
    } catch (error: unknown) {
      const {
        message,
        errors,
      } = error as ApiError
    }
  })

  return {
    isLoadingProductAttributes,
    isLoadingSubcategoryAttributes,
    subcategoryAttributesMap,
    isSubmitting,
    onSubmit,
  }
}
