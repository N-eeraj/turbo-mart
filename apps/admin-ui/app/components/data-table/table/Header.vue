<script setup lang="ts" generic="TData">
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
  <TableHeader class="bg-secondary">
    <TableRow
      v-for="headerGroup in table.getHeaderGroups()"
      :key="headerGroup.id">
      <TableHead
        v-for="header in headerGroup.headers"
        :key="header.id">
        <slot
          :name="header.id"
          v-bind="header">
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()" />
        </slot>
      </TableHead>
    </TableRow>
  </TableHeader>
</template>
