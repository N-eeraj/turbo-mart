<script setup lang="ts">
import {
  CREATE_CATEGORY,
} from "~/constants/breadcrumbs"

async function submitHandler(body: any) {
  const response = await useApi("/admin/catalogue/categories", {
    method: "POST",
    body,
  })
  navigateTo(`/catalogue/categories/${response.data.id}`)
  return response
}
</script>

<template>
  <BaseHeader
    title="Create Category"
    :breadcrumbs="CREATE_CATEGORY" />

  <CatalogueCategoriesForm
    :submit-handler
    class="mt-4" />
</template>
