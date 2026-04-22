<script setup lang="ts">
import type {
  TooltipColor,
} from "@/types/base"

interface Props {
  tooltip?: string
  color?: TooltipColor
}
defineProps<Props>()
</script>

<template>
  <BaseTooltip
    v-if="tooltip"
    :tooltip
    :color>
    <slot />
  </BaseTooltip>
  <slot v-else />
</template>
