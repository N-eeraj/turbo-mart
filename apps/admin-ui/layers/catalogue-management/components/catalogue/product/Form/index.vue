<script setup lang="ts">
interface Props {
  onSubmitProduct: (_body: any) => Promise<ApiSuccess>
}
const props = defineProps<Props>()

const route = useRoute()
const router = useRouter()

const productId = computed(() => route.params?.id)

const {} = useLazyAsyncData(
  "product" + productId.value ? `-${productId}` : "",
  () => useApi(`/admin/catalogue/products/${productId.value}`),
  {
    immediate: !!productId.value,
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

const steps = computed(() => ([
  {
    indicator: 1,
    title: "Create",
    description: "Create the product",
  },
  {
    indicator: 2,
    title: "Create Attributes",
    description: "Create the attributes of the product",
    disabled: true,
  },
  {
    indicator: 3,
    title: "Create Variants",
    description: "Create the variants of the product",
    disabled: true,
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
</script>

<template>
  <BaseStepper
    v-model="step"
    :steps
    :linear="false">
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
