<script setup lang="ts">
import type {
  Order,
  FilterProps,
} from "~/types/dataTable"

interface Props {
  hideSearch: FilterProps["hideSearch"]
  hideSort: FilterProps["hideSort"]
}
defineProps<Props>()

const search = defineModel<string>("search")
const order = defineModel<Order>("order")
</script>

<template>
  <div class="flex justify-end items-center gap-x-3">
    <slot name="addon-left" />

    <FormFieldInput
      v-if="!hideSearch"
      name="search"
      v-model="search"
      placeholder="Search"
      clearable />

    <BaseSortButton
      v-if="!hideSort"
      v-model="order" />

    <slot name="addon-right" />
  </div>
</template>
