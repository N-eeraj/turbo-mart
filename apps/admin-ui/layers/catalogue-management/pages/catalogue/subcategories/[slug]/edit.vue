<script setup lang="ts">
import {
  EDIT_SUBCATEGORY,
} from "~/constants/breadcrumbs"

const {
  data,
  isLoading: subcategoryLoading,
} = useSubcategoryData()

const initialValues = computed(() => {
  if (!data.value) return undefined
  return {
    ...data.value,
    category: data.value.category.id,
  }
})

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
    :initial-values
    class="mt-4" />
</template>
