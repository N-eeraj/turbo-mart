<script setup lang="ts">
import {
  ALL_SUBCATEGORIES,
} from "~/constants/subcategories/breadcrumbs"

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
} = useSubcategoryListData()

const formatDate = (createdAt: Date) => useDateFormat(createdAt, "DD/MM/YYYY")
</script>

<template>
  <BaseHeader
    title="All Subcategories"
    :breadcrumbs="ALL_SUBCATEGORIES">
    <template #right>
      <NuxtLink to="/catalogue/subcategories/create">
        <BaseButton
          variant="outline"
          size="sm"
          class="flex items-center gap-x-1.5">
          <Icon name="tabler:category-plus" />
          <span>
            Create Subcategory
          </span>
        </BaseButton>
      </NuxtLink>
    </template>
  </BaseHeader>

  <DataTable
    v-model:search="search"
    v-model:order="order"
    v-model:page="page"
    :data
    :columns
    is-infinite
    :has-next="hasNextPage"
    :loading="isLoading"
    class="basis-0 grow mt-2"
    filter-container-class="items-end!">
    <template #table-cell-category="{ row }">
      {{ row.original.category.name }}
    </template>

    <template #table-cell-createdAt="{ row }">
      {{ formatDate(row.original.createdAt) }}
    </template>

    <template #table-cell-updatedAt="{ row }">
      {{ formatDate(row.original.updatedAt) }}
    </template>

    <template #table-cell-id="{ row }">
      <DataTableActions
        :is-deleting="deletingIds.includes(row.original.id)"
        @view="navigateTo(`/catalogue/subcategories/${row.original.slug}`)"
        @edit="navigateTo(`/catalogue/subcategories/${row.original.slug}/edit`)"
        @delete="handleDelete(row.original.id)" />
    </template>
  </DataTable>

  <BaseConfirmation
    :open="showDeleteConfirmation"
    variant="destructive"
    @confirm="confirmDelete"
    @cancel="cancelDelete">
    <template #description>
      You are about to delete this subcategory.
      This action is irreversible, are you sure you want to continue?
    </template>
  </BaseConfirmation>
</template>
