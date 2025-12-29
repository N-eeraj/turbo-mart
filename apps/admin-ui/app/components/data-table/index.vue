<script setup lang="ts">
import type {
  Order,
  DataTableProps,
} from "~/types/dataTable"

interface Props extends DataTableProps {}
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

    <BaseLinearProgress v-if="loading"  />

    <template v-else>
      {{ data }}
    </template>
  </section>
</template>
