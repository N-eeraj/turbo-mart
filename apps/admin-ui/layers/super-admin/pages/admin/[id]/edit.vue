<script setup lang="ts">
import {
  EDIT_ADMIN,
} from "~/constants/breadcrumbs"

const {
  adminId,
  permissionMappedData,
  isLoading: adminLoading,
} = useAdminData()

async function submitHandler(body: any) {
  const response = await useApi(`/super-admin/admin/${adminId.value}`, {
    method: "PATCH",
    body,
  })
  navigateTo(`/admin/${adminId.value}`)
  return response
}
</script>

<template>
  <BaseHeader
    title="Edit Admin"
    :breadcrumbs="EDIT_ADMIN" />

  <BaseLinearProgress v-if="adminLoading" />

  <AdminForm
    v-else
    :submit-handler
    :initial-values="permissionMappedData"
    class="mt-4" />
</template>
