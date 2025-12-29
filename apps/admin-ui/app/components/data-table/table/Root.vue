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
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
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
      <DataTableTableHeader :table />
      <DataTableTableBody
        :columns
        :table
        :loading />
    </Table>
  </div>
</template>
  