<script setup lang="ts">
import {
  type Notification,
} from "@/composables/profile/useUnreadNotifications"

defineProps<Notification>()
</script>

<template>
  <div class="flex flex-col items-start w-full">
    <strong class="leading-none">
      {{ title }}
    </strong>
    <p class="text-sm text-foreground/70 line-clamp-2">
      {{ message }}
    </p>
    <span class="w-full text-xs text-foreground/70 text-end">
      {{ useTimeAgo(createdAt) }}
    </span>
  </div>
</template>
