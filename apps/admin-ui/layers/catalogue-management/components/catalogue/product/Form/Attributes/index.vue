<script setup lang="ts">
interface Emits {
  submit: [unknown]
}
const emit = defineEmits<Emits>()

const {
  isLoadingProductAttributes,
  isLoadingSubcategoryAttributes,
  subcategoryAttributesMap,
  onSubmit,
} = useProductFormAttributes(emit)
</script>

<template>
  <BaseLinearProgress v-if="isLoadingProductAttributes || isLoadingSubcategoryAttributes" />

  <form
    v-else
    class="flex flex-col gap-y-3"
    @submit="onSubmit">
    <CatalogueProductFormAttributesProperties :attributes="subcategoryAttributesMap.properties" />
    <CatalogueProductFormAttributesVariants :attributes="subcategoryAttributesMap.variants" />
    <BaseButton class="ml-auto">
      Submit
    </BaseButton>
  </form>
</template>
