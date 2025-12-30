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
  permissionsFilter,
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
    class="mt-2 md:mt-0"
    filter-container-class="items-end!">
    <template #filter-addon-left>
      <div class="space-y-1">
        <small class="inline-block text-xs text-foreground/50">
          Filter by Permissions
        </small>
        <BaseSelect
          v-model="permissionsFilter"
          :options="permissions"
          :loading="isLoadingPermissions"
          multiple
          clearable>
          <template #trigger="{ modelValue }">
            <template v-if="!modelValue?.length">
              Select Permissions
            </template>
            <template v-else-if="modelValue.length > 2">
              {{ modelValue.length }} Selected
            </template>
          </template>
        </BaseSelect>
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
