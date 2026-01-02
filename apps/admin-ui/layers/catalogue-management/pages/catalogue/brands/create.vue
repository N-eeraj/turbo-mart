<script setup lang="ts">
import {
  CREATE_BRAND,
} from "~/constants/brands/breadcrumbs"

async function submitHandler(body: any) {
  const response = await useApi("/admin/catalogue/brands", {
    method: "POST",
    body,
  })
  navigateTo(`/catalogue/brands/${response.data.slug}`)
  return response
}
</script>

<template>
  <BaseHeader
    title="Create Brand"
    :breadcrumbs="CREATE_BRAND" />

  <CatalogueBrandForm
    :submit-handler
    class="mt-4" />
</template>
