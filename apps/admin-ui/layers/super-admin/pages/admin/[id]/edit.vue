<script setup lang="ts">
import {
  EDIT_ADMIN,
} from "~/constants/breadcrumbs"

const route = useRoute()
const router = useRouter()
async function submitHandler(body: any) {
  const response = await useApi(`/super-admin/admin/${route.params.id}`, {
    method: "PATCH",
    body,
  })
  router.push("/admin")
  return response
}

const adminData = {
  name: "John Doe",
  email: "email@example.com",
  permissions: [0,1],
}
</script>

<template>
  <BaseHeader
    title="Edit Admin"
    :breadcrumbs="EDIT_ADMIN" />

  <AdminForm
    :submit-handler
    :initial-values="adminData"
    class="mt-4" />
</template>
