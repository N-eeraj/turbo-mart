<script setup lang="ts" generic="TData, TValue">
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import type { TableBodyProps } from "~/types/dataTable"

type PropsBase = TableBodyProps<TData, TValue>
interface Props {
  loading?: PropsBase["loading"]
  columns: PropsBase["columns"]
  table: PropsBase["table"]
}
defineProps<Props>()
</script>

<template>
  <TableBody>
    <TableRow v-if="loading">
      <TableCell
        :colspan="columns.length"
        class="p-0">
        <BaseLinearProgress />
      </TableCell>
    </TableRow>

    <template v-else-if="table.getRowModel().rows?.length">
      <TableRow
        v-for="row in table.getRowModel().rows"
        :key="row.id"
        :data-state="row.getIsSelected() ? 'selected' : undefined">
        <TableCell
          v-for="cell in row.getVisibleCells()"
          :key="cell.id">
          <slot
            :name="cell.column.columnDef.id"
            v-bind="cell">
            {{ row.original[cell.column.columnDef.id] }}
          </slot>
        </TableCell>
      </TableRow>
    </template>

    <template v-else>
      <TableRow>
        <TableCell
          :colspan="columns.length"
          class="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    </template>
  </TableBody>
</template>
