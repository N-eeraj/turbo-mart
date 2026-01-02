<script setup lang="ts">
import {
  EDIT_BRAND,
} from "~/constants/breadcrumbs"

const {
  data,
  isLoading: brandLoading,
} = useBrandData()

async function submitHandler(body: any) {
  const response = await useApi(`/admin/catalogue/brands/${data.value.id}`, {
    method: "PATCH",
    body,
  })
  navigateTo(`/catalogue/brands/${response.data.slug}`)
  return response
}
</script>

<template>
  <BaseHeader
    title="Edit Brand"
    :breadcrumbs="EDIT_BRAND" />

  <BaseLinearProgress v-if="brandLoading" />

  <CatalogueBrandForm
    v-else
    :submit-handler
    :initial-values="data"
    class="mt-4" />
</template>
