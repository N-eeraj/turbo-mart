<script setup lang="ts">
const BREADCRUMBS = [
  {
    text: "All Admins",
    url: "/admin",
    icon: "lucide:users",
  },
  {
    text: "Create Admin",
    url: "/admin/create",
    icon: "lucide:user-plus",
  },
] satisfies Breadcrumb
</script>

<template>
  <BaseHeader
    title="Create Admin"
    :breadcrumbs="BREADCRUMBS" />

  <AdminForm />
</template>
