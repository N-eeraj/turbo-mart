<script setup lang="ts">
import type {
  Breadcrumb,
} from "@/types/breadcrumb"

interface Props {
  title: string
  breadcrumbs: Array<Breadcrumb>
  hideHome?: boolean
}
defineProps<Props>()
</script>

<template>
  <div class="space-y-1">
    <BaseBreadcrumbs
      :items="breadcrumbs"
      :hide-home />

    <div class="flex justify-between items-center w-full">
      <div class="flex items-center gap-x-1">
        <slot
          name="left"
          :title>
          <h1 class="text-xl md:text-2xl">
            {{ title }}
          </h1>
        </slot>
      </div>

      <slot name="right" />
    </div>
  </div>
</template>
