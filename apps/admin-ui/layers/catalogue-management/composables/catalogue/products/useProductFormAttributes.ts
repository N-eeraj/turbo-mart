import type z from "zod"

import {
  productAttributeSchema,
} from "@app/schemas/admin/catalogue/product"
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface EmitsParameter {
  submit: [unknown]
}

interface ProductInfo {
  id: string
  subcategory: string
  attributes?: {
    properties?: {
      attribute: string
      label?: string
      value: unknown
      meta: Record<string, unknown>
    }
    variants?: {
      attribute: string
      values: Array<{
        label?: string
        value: unknown
        slug: string
        meta: Record<string, unknown>
      }>
    }
  }
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
        ?.find((property) => property.attribute === id)
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
        ?.find((variant) => variant.attribute === id)
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

  const {
    values,
    isSubmitting,
    handleSubmit,
    setValues,
    setFieldValue,
  } = useForm({
    validationSchema: toTypedSchema(
      productAttributeSchema as unknown as z.ZodType<any, z.ZodTypeDef, any>
    ),
  })

  provide("product-form-attributes", {
    values,
    setFieldValue,
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data)
    } catch (error: unknown) {
    }
  })

  return {
    isLoadingProductAttributes,
    isLoadingSubcategoryAttributes,
    subcategoryAttributesMap,
    onSubmit,
  }
}
