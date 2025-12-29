<script setup lang="ts">
import {
  ALL_ADMINS,
} from "~/constants/breadcrumbs"

const {
  data,
  isLoading,
  page,
  hasNextPage,
  search,
  order,
  filters,
  columns,
  permissions,
  isLoadingPermissions,
  handleDelete,
  showDeleteConfirmation,
  deletingIds,
  confirmDelete,
  cancelDelete,
} = useAdminListData()

const formatDate = (createdAt) => useDateFormat(createdAt, "DD/MM/YYYY")
</script>

<template>
  <BaseHeader
    title="All Admins"
    :breadcrumbs="ALL_ADMINS" />

  <DataTable
    v-model:search="search"
    v-model:order="order"
    v-model:page="page"
    :data
    :columns
    :is-infinite="true"
    :has-next="hasNextPage"
    :loading="isLoading"
    class="mt-4">
    <template #filter-addon-left>
      <div class="max-w-80">
        <FormFieldSelect
          v-model="filters.permissions"
          name="filter.permissions"
          placeholder="Filter by Permission"
          :options="permissions"
          :loading="isLoadingPermissions"
          multiple />
      </div>
    </template>

    <template #table-cell-createdAt="{ row }">
      {{ formatDate(row.original.createdAt) }}
    </template>

    <template #table-cell-id="{ row }">
      <AdminListActions
        :id="row.original.id"
        :is-deleting="deletingIds.includes(row.original.id)"
        @delete="handleDelete(row.original.id)" />
    </template>
  </DataTable>

  <AdminDeleteConfirmation
    :open="showDeleteConfirmation"
    @confirm="confirmDelete"
    @cancel="cancelDelete" />
</template>
