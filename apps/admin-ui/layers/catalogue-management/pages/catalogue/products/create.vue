<script setup lang="ts">
import {
  CREATE_PRODUCT,
} from "~/constants/products/breadcrumbs"

async function submitHandler(body: any) {
  const response = await useApi("/admin/catalogue/products", {
    method: "POST",
    body,
  })
  return response
}
</script>

<template>
  <BaseHeader
    title="Create Product"
    :breadcrumbs="CREATE_PRODUCT" />

  <CatalogueProductForm
    :submit-handler />
</template>
