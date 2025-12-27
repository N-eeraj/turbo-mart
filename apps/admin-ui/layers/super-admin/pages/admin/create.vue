<script setup lang="ts">
import {
  CREATE_ADMIN,
} from "~/constants/breadcrumbs"
</script>

<template>
  <BaseHeader
    title="Create Admin"
    :breadcrumbs="CREATE_ADMIN" />

  <AdminForm />
</template>
