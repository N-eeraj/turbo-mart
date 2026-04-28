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
import type {
  TooltipColor,
} from "@/types/base"

interface Props {
  disabled?: boolean
  loading?: boolean
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  tooltip?: {
    content?: string
    color?: TooltipColor
  }
}
const props = defineProps<Props>()

const attrs = useAttrs()

const cursorClass = computed(() => {
  if (props.loading) return "cursor-progress"
  if (props.disabled) return "cursor-not-allowed"
  return "cursor-pointer"
})
</script>

<template>
  <BaseButtonWrapper
    :tooltip="tooltip?.content"
    :color="tooltip?.color">
    <Button
      :variant
      :size
      :disabled="disabled || loading"
      v-bind="attrs"
      :class="cn(
        'disabled:grayscale-50',
        loading && 'relative',
        cursorClass,
      )">
      <template v-if="loading">
        <Spinner
          v-if="loading"
          class="absolute top-1/2 left-1/2 [&+*]:opacity-0 -translate-x-1/2 -translate-y-1/2" />
        <div>
          <slot />
        </div>
      </template>
      <slot v-else />
    </Button>
  </BaseButtonWrapper>
</template>
