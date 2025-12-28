<script setup lang="ts">
import type {
  Order,
} from "~/types/ui"

const order = defineModel<Order>({
  default: "asc",
})

const toggleOrder = () => {
  order.value = order.value === "asc" ? "desc" : "asc"
}
</script>

<template>
  <BaseButton
    variant="outline"
    size="icon"
    @click="toggleOrder">
    <Icon :name="order === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down'" />
  </BaseButton>
</template>
