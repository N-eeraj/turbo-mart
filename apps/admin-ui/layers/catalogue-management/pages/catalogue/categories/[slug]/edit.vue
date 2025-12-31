<script setup lang="ts">
import {
  EDIT_CATEGORY,
} from "~/constants/breadcrumbs"

const {
  data,
  isLoading: categoryLoading,
} = useCategoryData()

async function submitHandler(body: any) {
  const response = await useApi(`/admin/catalogue/categories/${data.value.id}`, {
    method: "PATCH",
    body,
  })
  navigateTo(`/catalogue/categories/${response.data.slug}`)
  return response
}
</script>

<template>
  <BaseHeader
    title="Edit Category"
    :breadcrumbs="EDIT_CATEGORY" />

  <BaseLinearProgress v-if="categoryLoading" />

  <CatalogueCategoryForm
    v-else
    :submit-handler
    :initial-values="data"
    class="mt-4" />
</template>
