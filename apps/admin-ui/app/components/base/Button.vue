<script setup lang="ts">
import {
  Button,
} from "~/components/ui/button"
import {
  Spinner,
} from "~/components/ui/spinner"
import { cn } from "~/lib/utils"

interface Props {
  disabled?: boolean
  loading?: boolean
}
const {
  loading,
  disabled,
} = defineProps<Props>()

const cursorClass = computed(() => {
  if (loading) return "cursor-progress"
  if (disabled) return "cursor-not-allowed"
  return "cursor-pointer"
})
</script>

<template>
  <Button
    :disabled="disabled || loading"
    :class="cn(
      'disabled:grayscale-50',
      cursorClass,
    )">
    <Spinner v-if="loading" />
    <template v-else>
      <slot />
    </template>
  </Button>
</template>
