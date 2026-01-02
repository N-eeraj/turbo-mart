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
</script>

<template>
  <BaseHeader
    title="All Subcategories"
    :breadcrumbs="ALL_SUBCATEGORIES"
    class="mb-2">
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

  <CatalogueSubcategoryTable
    v-model:search="search"
    v-model:order="order"
    v-model:page="page"
    :data
    :columns
    is-infinite
    :has-next="hasNextPage"
    :loading="isLoading"
    :deleting-ids
    :show-delete-confirmation
    @delete="handleDelete"
    @confirm-delete="confirmDelete"
    @cancel-delete="cancelDelete" />
</template>
