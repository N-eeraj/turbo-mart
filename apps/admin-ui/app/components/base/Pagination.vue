<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface TotalProps {
  isInfinite: false
  total?: number
}
interface InfiniteProps {
  isInfinite: true
  hasNext: boolean
  total?: never
}
type Props = TotalProps | InfiniteProps
const props = withDefaults(defineProps<Props>(), {
  total: 1,
})

const page = defineModel<number>({
  required: true,
})

const showNext = computed(() => {
  if (props.isInfinite) return props.hasNext
  else if (props.total) return page.value < props.total
  return true
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <Pagination
      v-model:page="page"
      v-slot="{ page }"
      show-edges
      :items-per-page="1"
      :sibling-count="1"
      :total="isInfinite ? page + 1 : total">
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious
          v-if="page !== 1"
          class="cursor-pointer" />

        <template
          v-for="(item, index) in items"
          :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
            class="cursor-pointer">
            {{ item.value }}
          </PaginationItem>
          <PaginationEllipsis v-else />
        </template>

        <PaginationNext
          v-if="showNext"
          class="cursor-pointer" />
      </PaginationContent>
    </Pagination>
  </div>
</template>
