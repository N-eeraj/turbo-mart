<script setup lang="ts">
import {
  Button,
  type ButtonVariants,
} from "@/components/ui/button"
import {
  Spinner,
} from "@/components/ui/spinner"
import {
  cn,
} from "@/lib/utils"

interface Props {
  disabled?: boolean
  loading?: boolean
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
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
    :variant
    :size
    :disabled="disabled || loading"
    :class="cn(
      'disabled:grayscale-50',
      loading && 'relative',
      cursorClass,
    )">
    <Spinner
      v-if="loading"
      class="absolute top-1/2 left-1/2 [&+*]:opacity-0 -translate-x-1/2 -translate-y-1/2" />
    <div>
      <slot />
    </div>
  </Button>
</template>
