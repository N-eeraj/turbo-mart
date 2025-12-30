<script setup lang="ts">
import {
  ALL_CATEGORIES,
} from "~/constants/breadcrumbs"

const {
  data,
  isLoading,
  page,
  hasNextPage,
  search,
  order,
  columns,
  handleDelete,
  showDeleteConfirmation,
  deletingIds,
  confirmDelete,
  cancelDelete,
} = useCategoryListData()

const formatDate = (createdAt: Date) => useDateFormat(createdAt, "DD/MM/YYYY")
</script>

<template>
  <BaseHeader
    title="All Categories"
    :breadcrumbs="ALL_CATEGORIES" />

  <DataTable
    v-model:search="search"
    v-model:order="order"
    v-model:page="page"
    :data
    :columns
    is-infinite
    :has-next="hasNextPage"
    :loading="isLoading"
    class="basis-0 grow mt-2 md:mt-0"
    filter-container-class="items-end!">
    <template #table-cell-createdAt="{ row }">
      {{ formatDate(row.original.createdAt) }}
    </template>

    <template #table-cell-updatedAt="{ row }">
      {{ formatDate(row.original.updatedAt) }}
    </template>

    <template #table-cell-id="{ row }">
      <DataTableActions
        :is-deleting="deletingIds.includes(row.original.id)"
        @view="navigateTo(`/catalogue/categories/${row.original.id}`)"
        @edit="navigateTo(`/catalogue/categories/${row.original.id}/edit`)"
        @delete="handleDelete(row.original.id)" />
    </template>
  </DataTable>

  <BaseConfirmation
    :open="showDeleteConfirmation"
    variant="destructive"
    @confirm="confirmDelete"
    @cancel="cancelDelete">
    <template #description>
      You are about to delete this category.
      This action is irreversible, are you sure you want to continue?
    </template>
  </BaseConfirmation>
</template>
