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
}
defineProps<Props>()

const search = defineModel<string>("search")
const order = defineModel<Order>("order")
</script>

<template>
  <section>
    <slot name="filter">
      <DataTableFilter
        v-model:search="search"
        v-model:order="order"
        :hide-search
        :hide-sort
        class="mb-4">
        <slot name="filter-addon" />
      </DataTableFilter>
    </slot>

    <DataTableTableRoot
      :data
      :columns
      :loading />
  </section>
</template>
