<script setup lang="ts">
interface Emits {
  submit: [unknown]
}
const emit = defineEmits<Emits>()

const {
  isLoadingProductAttributes,
  isLoadingSubcategoryAttributes,
  subcategoryAttributesMap,
} = useProductFormAttributes(emit)
</script>

<template>
  <BaseLinearProgress v-if="isLoadingProductAttributes || isLoadingSubcategoryAttributes" />
  <form
    v-else
    class="space-y-3">
    <CatalogueProductFormAttributesProperties :attributes="subcategoryAttributesMap.properties" />
    <CatalogueProductFormAttributesVariants :attributes="subcategoryAttributesMap.variants" />
  </form>
</template>
