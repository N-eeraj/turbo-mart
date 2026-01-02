<script setup lang="ts">
import {
  CREATE_CATEGORY,
} from "~/constants/categories/breadcrumbs"

async function submitHandler(body: any) {
  const response = await useApi("/admin/catalogue/categories", {
    method: "POST",
    body,
  })
  navigateTo(`/catalogue/categories/${response.data.slug}`)
  return response
}
</script>

<template>
  <BaseHeader
    title="Create Category"
    :breadcrumbs="CREATE_CATEGORY" />

  <CatalogueCategoryForm
    :submit-handler
    class="mt-4" />
</template>
