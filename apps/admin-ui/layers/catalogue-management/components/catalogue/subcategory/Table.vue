<script setup lang="ts" generic="TData, TValue">
import type {
  Order,
  DataTableProps,
} from "~/types/dataTable"

type PropsBase = DataTableProps<TData, TValue>
interface Props {
  columns: PropsBase["columns"]
  data: PropsBase["data"]
  hideSearch: PropsBase["hideSearch"]
  hideSort: PropsBase["hideSort"]
  loading?: PropsBase["loading"]
  totalPages?: PropsBase["totalPages"]
  isInfinite?: PropsBase["isInfinite"]
  hasNext?: PropsBase["hasNext"]
  filterByCategory?: boolean
  deletingIds: Array<string>
  showDeleteConfirmation: boolean
}
withDefaults(defineProps<Props>(), {
  totalPages: 1,
  isInfinite: false,
  hasNext: false,
})

const search = defineModel<string>("search")
const order = defineModel<Order>("order")
const page = defineModel<number>("page", {
  default: 1,
})

interface Emits {
  "delete": [string]
  "confirmDelete": []
  "cancelDelete": []
}
const emit = defineEmits<Emits>()


const {
  categories,
  isLoading: isLoadingCategories,
  hasNextPage: hasNextCategoriesPage,
  loadMore: loadMoreCategories,
  search: categorySearch,
} = useInfiniteCategorySelect()

const categoriesFilter = ref([])

const formatDate = (date: Date) => useDateFormat(date, "DD/MM/YYYY")
</script>
  
<template>
  <DataTable
    v-model:search="search"
    v-model:order="order"
    v-model:page="page"
    :data
    :columns
    is-infinite
    :has-next
    :loading
    filter-container-class="items-end!"
    class="basis-0 grow">
    <template
      #filter-addon-left
      v-if="filterByCategory">
      <div class="space-y-1">
        <small class="inline-block text-xs text-foreground/50">
          Filter by Category
        </small>
        <BaseCombobox
          name="category"
          v-model="categoriesFilter"
          v-model:search="categorySearch"
          placeholder="Select Category"
          :options="categories"
          :loading="isLoadingCategories"
          multiple
          is-infinite
          :has-more-items="hasNextCategoriesPage"
          @scroll-end="loadMoreCategories">
          <template #trigger="{ modelValue }">
            <template v-if="!modelValue?.length">
              Select Categories
            </template>
            <template v-else-if="modelValue.length > 2">
              {{ modelValue.length }} Selected
            </template>
          </template>
        </BaseCombobox>
      </div>
    </template>

    <template #table-cell-category="{ row }">
      <NuxtLink
        :to="`/catalogue/categories/${row.original.category.slug}`"
        class="w-fit hover:underline">
        {{ row.original.category.name }}
      </NuxtLink>
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
        @delete="emit('delete', row.original.id)" />
    </template>
  </DataTable>

  <BaseConfirmation
    :open="showDeleteConfirmation"
    variant="destructive"
    @confirm="emit('confirmDelete')"
    @cancel="emit('cancelDelete')">
    <template #description>
      You are about to delete this subcategory.
      This action is irreversible, are you sure you want to continue?
    </template>
  </BaseConfirmation>
</template>
