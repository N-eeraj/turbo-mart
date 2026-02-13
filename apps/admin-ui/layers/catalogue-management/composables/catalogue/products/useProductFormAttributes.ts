import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface EmitsParameter {
  submit: [unknown]
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
      }
    }),
    {
      transform: ({ data }) => data,
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
      transform: ({ data }) => data,
    }
  )
  const isLoadingSubcategoryAttributes = computed(() => subcategoryAttributesStatus.value === "pending")

  const subcategoryAttributesMap = computed(() => {
    const attributesList: Array<AttributeObject<AttributeType>> = subcategoryAttributes.value ?? []
    const mappedAttributes = attributesList.reduce((
      attributeMap: Record<"base" | "variant", Array<Omit<typeof attributesList[number], "variant">>>,
      { variant, ...attribute }
    ) => {
      const key: keyof typeof attributeMap = variant ? "variant" : "base"
      attributeMap[key]
        .push(attribute)
      return attributeMap
    }, {
      base: [],
      variant: [],
    })
    return mappedAttributes
  })

  watch(() => productAttributes.value, (data) => {
    console.log(data)
    fetchSubcategoryAttributes()
  })

  return {
    isLoadingProductAttributes,
    isLoadingSubcategoryAttributes,
    subcategoryAttributesMap,
  }
}
