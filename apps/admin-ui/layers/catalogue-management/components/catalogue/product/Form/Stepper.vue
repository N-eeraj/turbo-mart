<script setup lang="ts">
const {
  step,
  steps,
  handleStepChange,
  onSubmitProduct,
} = useProductFormStepper()
</script>

<template>
  <BaseStepper
    :model-value="step"
    :steps
    :linear="false"
    @change="handleStepChange">
    <template #step-1>
      <CatalogueProductForm
        class="mt-4"
        @submit="onSubmitProduct" />
    </template>
    <template #step-2>
      Attributes Form
    </template>
    <template #step-3>
      SKU Creation Form
    </template>
  </BaseStepper>
</template>
