<script setup lang="ts">
interface Props {
  categoryId: string
}
const props = defineProps<Props>()

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
} = useCategorySubcategories(props.categoryId)
</script>

<template>
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
    class="basis-0 grow mt-2"
    @delete="handleDelete"
    @confirm-delete="confirmDelete"
    @cancel-delete="cancelDelete" />
</template>
