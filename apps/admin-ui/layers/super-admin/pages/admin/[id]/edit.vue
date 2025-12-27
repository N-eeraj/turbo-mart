<script setup lang="ts">
import {
  EDIT_ADMIN,
} from "~/constants/breadcrumbs"
</script>

<template>
  <BaseHeader
    title="Edit Admin"
    :breadcrumbs="EDIT_ADMIN" />

  <AdminForm />
</template>
