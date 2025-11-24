<script setup lang="ts">
import {
  type Notification,
} from "@/composables/profile/useUnreadNotifications"
import {
  cn,
} from "@/lib/utils"

interface Props extends Notification {
  clampMessage?: boolean
}

withDefaults(defineProps<Props>(), {
  clampMessage: false,
})
</script>

<template>
  <div class="flex flex-col items-start w-full p-1 @sm:p-2.5 rounded-sm duration-300">
    <strong class="leading-none">
      {{ title }}
    </strong>
    <p
      :class="cn(
        'text-sm text-foreground/70',
        clampMessage && 'line-clamp-2',
      )">
      {{ message }}
    </p>
    <span class="w-full text-xs text-foreground/70 text-end">
      {{ useTimeAgo(createdAt) }}
    </span>
  </div>
</template>
