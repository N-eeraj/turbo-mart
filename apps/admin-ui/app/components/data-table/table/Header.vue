<script setup lang="ts" generic="TData, TValue">
import {
  FlexRender,
} from "@tanstack/vue-table"
import {
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table"
import type {
  TableHeaderProps
} from "~/types/dataTable"

interface Props {
  table: TableHeaderProps<TData>["table"]
}
defineProps<Props>()
</script>

<template>
  <TableHeader>
    <TableRow
      v-for="headerGroup in table.getHeaderGroups()"
      :key="headerGroup.id">
      <TableHead
        v-for="header in headerGroup.headers"
        :key="header.id">
        <FlexRender
          v-if="!header.isPlaceholder"
          :render="header.column.columnDef.header"
          :props="header.getContext()" />
      </TableHead>
    </TableRow>
  </TableHeader>
</template>
