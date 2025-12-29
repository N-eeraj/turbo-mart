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
</script>

<template>
  <section class="flex flex-col gap-y-2">
    <slot name="filter">
      <DataTableFilter
        v-model:search="search"
        v-model:order="order"
        :hide-search
        :hide-sort>
        <slot name="filter-addon" />
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
      v-if="isInfinite"
      v-model="page"
      :is-infinite
      :has-next
      class="ml-auto" />
    <BasePagination
      v-else-if="totalPages && totalPages > 1"
      v-model="page"
      :total="totalPages"
      class="ml-auto" />
  </section>
</template>
