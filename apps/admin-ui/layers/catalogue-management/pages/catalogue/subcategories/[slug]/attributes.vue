<script setup lang="ts">
const {
  subcategorySlug,
  ...subcategoryData
} = useSubcategoryData()

provide(`subcategory-${subcategorySlug.value}`, subcategoryData)
</script>

<template>
  <section class="flex flex-col gap-y-2 md:gap-y-3">
    <h1 class="text-lg md:text-xl">
      Attributes
    </h1>

    <CatalogueSubcategoryAttributesForm />
  </section>
</template>
