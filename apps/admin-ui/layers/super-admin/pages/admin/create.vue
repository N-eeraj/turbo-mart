<script setup lang="ts">
import {
  CREATE_ADMIN,
} from "~/constants/breadcrumbs"
</script>

<template>
  <BaseHeader
    title="Create Admin"
    :breadcrumbs="CREATE_ADMIN" />

  <AdminForm class="mt-4" />
</template>
