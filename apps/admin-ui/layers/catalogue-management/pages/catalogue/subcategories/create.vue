<script setup lang="ts">
import {
  CREATE_SUBCATEGORY,
} from "~/constants/breadcrumbs"

async function submitHandler(body: any) {
  const response = await useApi("/admin/catalogue/subcategories", {
    method: "POST",
    body,
  })
  navigateTo(`/catalogue/subcategories/${response.data.slug}`)
  return response
}
</script>

<template>
  <BaseHeader
    title="Create Subcategory"
    :breadcrumbs="CREATE_SUBCATEGORY" />

  <CatalogueSubcategoryForm
    :submit-handler
    class="mt-4" />
</template>
