<script setup lang="ts">
interface Props {
  onSubmitProduct: (_body: any) => Promise<ApiSuccess>
  onSubmitAttributes: (_body: any) => Promise<ApiSuccess>
  onSubmitVariants: (_body: any) => Promise<ApiSuccess>
}
const props = defineProps<Props>()

const route = useRoute()
const router = useRouter()

const productId = computed(() => route.params?.id)

const steps = computed(() => ([
  {
    indicator: 1,
    title: productId.value ? "Update" : "Create",
    description: `${productId.value ? "Update" : "Create"} the product`,
  },
  {
    indicator: 2,
    title: "Attributes",
    description: "Update product attributes",
    disabled: !productId.value,
  },
  {
    indicator: 3,
    title: "Variants",
    description: "Update product variants",
    disabled: !productId.value,
  },
]))

// sync stepper step with route query
const step = useRouteQuery<number>("step", 1, {
  transform: (value: number) => {
    if (value < 1 || value > steps.value.length) {
      step.value = 1
      return 0
    }
    return value - 1
  },
})

function handleStepChange(stepValue: number | undefined) {
  if (stepValue === undefined) {
    step.value = 1
  } else {
    step.value = stepValue + 1
  }
}

const {
  data: productData,
  status: productDataStatus,
  refresh: refreshProductData,
} = useLazyAsyncData(
  "product" + productId.value ? `-${productId.value}` : "",
  () => useApi(`/admin/catalogue/products/${productId.value}`),
  {
    immediate: !!productId.value,
  }
)

const {
  data: productAttributeData,
  status: productAttributeDataStatus,
  refresh: refreshProductAttributes,
} = useLazyAsyncData(
  `product-${productId.value}-attributes`,
  () => useApi(`/admin/catalogue/products/${productId.value}/attributes`),
  {
    immediate: step.value === 1,
  }
)

const {
  data: productVariantData,
  status: productVariantDataStatus,
  refresh: refreshProductVariants,
} = useLazyAsyncData(
  `product-${productId.value}-variants`,
  () => useApi(`/admin/catalogue/products/${productId.value}/variants`),
  {
    immediate:  step.value === 2,
  }
)

async function onSubmitProduct(body: any) {
  const response = await props.onSubmitProduct(body)
  router.replace({
    path: `/catalogue/products/${response.data.id}/edit`,
    query: {
      step: 2,
    },
  })
  return response
}
</script>

<template>
  <BaseStepper
    :model-value="step"
    :steps
    :linear="false"
    @change="handleStepChange">
    <template #step-1>
      <CatalogueProductFormCreate
        :submit-handler="onSubmitProduct"
        class="mt-4" />
    </template>
    <template #step-2>
      Attributes Form
    </template>
    <template #step-3>
      SKU Creation Form
    </template>
  </BaseStepper>
</template>
