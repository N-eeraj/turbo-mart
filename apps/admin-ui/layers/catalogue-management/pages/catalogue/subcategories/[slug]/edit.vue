<script setup lang="ts">
import {
  EDIT_SUBCATEGORY,
} from "~/constants/breadcrumbs"

const {
  data,
  isLoading: subcategoryLoading,
} = useSubcategoryData()

async function submitHandler(body: any) {
  const response = await useApi(`/admin/catalogue/subcategories/${data.value.id}`, {
    method: "PATCH",
    body,
  })
  navigateTo(`/catalogue/subcategories/${response.data.slug}`)
  return response
}
</script>

<template>
  <BaseHeader
    title="Edit Subcategory"
    :breadcrumbs="EDIT_SUBCATEGORY" />

  <BaseLinearProgress v-if="subcategoryLoading" />

  <CatalogueSubcategoryForm
    v-else
    :submit-handler
    :initial-values="data"
    class="mt-4" />
</template>
