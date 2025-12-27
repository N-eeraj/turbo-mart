<script setup lang="ts">
import {
  VIEW_ADMIN,
} from "~/constants/breadcrumbs"
</script>

<template>
  <BaseHeader
    title="View Admin"
    :breadcrumbs="VIEW_ADMIN" />

  <AdminForm />
</template>
