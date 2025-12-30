<script setup lang="ts">
import {
  CREATE_ADMIN,
} from "~/constants/breadcrumbs"

async function submitHandler(body: any) {
  const response = await useApi("/super-admin/admin", {
    method: "POST",
    body,
  })
  navigateTo(`/admins/${response.data.id}`)
  return response
}
</script>

<template>
  <BaseHeader
    title="Create Admin"
    :breadcrumbs="CREATE_ADMIN" />

  <AdminForm
    :submit-handler
    class="mt-4" />
</template>
