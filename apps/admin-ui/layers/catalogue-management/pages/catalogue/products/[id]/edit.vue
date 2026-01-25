<script setup lang="ts">
import {
  EDIT_PRODUCT,
} from "~/constants/products/breadcrumbs"

const route = useRoute()
const productId = computed(() => route.params?.id)

async function onSubmitProduct(body: any) {
  const response = await useApi(`/admin/catalogue/products/${productId.value}`, {
    method: "PATCH",
    body,
  })
  return response
}
</script>

<template>
  <BaseHeader
    title="Edit Product"
    :breadcrumbs="EDIT_PRODUCT" />

  <CatalogueProductForm
    :on-submit-product="onSubmitProduct" />
</template>
