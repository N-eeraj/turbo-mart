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
  filterContainerClass?: PropsBase["filterContainerClass"]
}
const props = withDefaults(defineProps<Props>(), {
  totalPages: 1,
  isInfinite: false,
  hasNext: false,
})

const search = defineModel<string>("search")
const order = defineModel<Order>("order")
const page = defineModel<number>("page", {
  default: 1,
})

const showPagination = computed(() => {
  if (props.isInfinite) {
    if (page.value === 1 && !props.hasNext) return false
    return true
  }
  return props.totalPages && props.totalPages > 1
})
const paginationProps = computed(() => {
  if (props.isInfinite) {
    return {
      isInfinite: true,
      hasNext: props.hasNext,
    }
  }
  return {
    total: props.totalPages,
  }
})
</script>

<template>
  <section class="flex flex-col gap-y-2">
    <slot name="filter">
      <DataTableFilter
        v-model:search="search"
        v-model:order="order"
        :hide-search
        :hide-sort
        :class="filterContainerClass">
        <template #addon-left>
          <slot name="filter-addon-left" />
        </template>
        <template #addon-right>
          <slot name="filter-addon-right" />
        </template>
      </DataTableFilter>
    </slot>

    <DataTableTableRoot
      :data
      :columns
      :loading
      class="mt-2">
      <template
        v-for="column in columns"
        #[`header-${column.id}`]="header">
        <slot
          :name="`table-header-${column.id}`"
          v-bind="header" />
      </template>
      <template
        v-for="column in columns"
        #[`cell-${column.id}`]="cell">
        <slot
          :name="`table-cell-${column.id}`"
          v-bind="cell" />
      </template>
    </DataTableTableRoot>

    <BasePagination
      v-if="showPagination"
      v-model="page"
      v-bind="paginationProps"
      class="ml-auto" />
  </section>
</template>
