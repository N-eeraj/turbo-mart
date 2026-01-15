<script setup lang="ts">
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

interface Props {
  title?: string
  description?: string
  mediaVariant?: "default" | "icon" | null | undefined
}
defineProps<Props>()
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia :variant="mediaVariant">
        <slot name="media" />
      </EmptyMedia>
      <EmptyTitle>
        <slot
          name="title"
          :title>
          {{ title }}
        </slot>
      </EmptyTitle>
      <EmptyDescription>
        <slot
          name="description"
          :description>
          {{ description }}
        </slot>
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <slot name="content" />
    </EmptyContent>
    <slot />
  </Empty>
</template>
