<script setup lang="ts">
import {
  ALL_ADMINS,
} from "~/constants/breadcrumbs"

const {
  data,
  isLoading,
  page,
  search,
  order,
} = useAdminListData()
</script>

<template>
  <BaseHeader
    title="All Admins"
    :breadcrumbs="ALL_ADMINS" />

  <DataTable
    v-model:search="search"
    v-model:order="order"
    :data
    :loading="isLoading"
    class="mt-4" />
</template>
