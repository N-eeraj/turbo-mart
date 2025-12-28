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

  <section class="mt-4">
    <div class="flex justify-end items-center gap-x-3">
      <FormFieldInput
        name="search"
        v-model="search"
        placeholder="Search"
        clearable />

      <BaseSortButton v-model="order" />
    </div>

    <BaseLinearProgress v-if="isLoading" />
    <template v-else>
      {{ data }}
    </template>
  </section>
</template>
