<script setup lang="ts">
const {
  subcategorySlug,
  data,
  isLoading,
} = useSubcategoryData()

provide(`subcategory-${subcategorySlug.value}`, data)
</script>

<template>
  <section class="flex flex-col gap-y-2 md:gap-y-3">
    <h1 class="text-lg md:text-xl">
      Attributes
    </h1>

    <BaseLinearProgress v-if="isLoading" />
    <CatalogueSubcategoryAttributesForm v-else-if="data" />
  </section>
</template>
