<script setup lang="ts">
interface Props {
  initialValues: Record<string, unknown>
  submitHandler: (_body: any) => Promise<ApiSuccess>
}
const props = defineProps<Props>()

async function submitHandler(body: any) {
  const response = props.submitHandler(body)
  step.value++
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
  transform: (value) => {
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
        :submit-handler
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
