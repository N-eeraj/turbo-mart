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
  columns,
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
    :columns
    :loading="isLoading"
    class="mt-4">
      <template #table-cell-id="{ row }">
        <NuxtLink :to="`/admin/${row.original.id}`">
          <BaseButton
            variant="ghost"
            size="icon"
            tabindex="-1">
            <Icon name="lucide:eye" />
          </BaseButton>
        </NuxtLink>
        <NuxtLink :to="`/admin/${row.original.id}/edit`">
          <BaseButton
            variant="ghost"
            size="icon"
            tabindex="-1">
            <Icon name="lucide:pen" />
          </BaseButton>
        </NuxtLink>
      </template>
    </DataTable>
</template>
