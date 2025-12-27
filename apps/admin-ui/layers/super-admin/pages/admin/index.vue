<script setup lang="ts">
const BREADCRUMBS = [
  {
    text: "All Admins",
    url: "/admin",
    icon: "lucide:users",
  },
] satisfies Breadcrumb
</script>

<template>
  <BaseHeader
    title="All Admins"
    :breadcrumbs="BREADCRUMBS" />
</template>
