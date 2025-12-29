<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from "@tanstack/vue-table"
import {
  getCoreRowModel,
  useVueTable,
} from "@tanstack/vue-table"

import {
  Table,
} from "@/components/ui/table"

const props = defineProps<{
  columns: Array<ColumnDef<TData, TValue>>
  data: Array<TData>
  loading?: boolean
}>()

const table = useVueTable({
  get data() { return props.data ?? [] },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <DataTableTableHeader :table>
        <template
          v-for="column in columns"
          #[column.id]="header">
          <slot
            :name="`header-${column.id}`"
            v-bind="header" />
        </template>
      </DataTableTableHeader>

      <DataTableTableBody
        :columns
        :table
        :loading>
        <template
          v-for="column in columns"
          #[column.id]="cell">
          <slot
            :name="`cell-${column.id}`"
            v-bind="cell" />
        </template>
      </DataTableTableBody>
    </Table>
  </div>
</template>
  