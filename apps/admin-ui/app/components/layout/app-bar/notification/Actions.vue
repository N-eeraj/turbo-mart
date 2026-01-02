<script setup lang="ts">
interface Props {
  unreadNotificationCount?: number
  isMarkingNotificationRead: boolean
}
defineProps<Props>()

interface Emits {
  markAllAsRead: []
}
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="flex justify-between items-center px-2">
    <NuxtLink
      to="/profile/notifications">
      <BaseButton
        variant="link"
        class="p-0 text-primary text-xs">
        View all
      </BaseButton>
    </NuxtLink>
    <BaseButton
      v-if="unreadNotificationCount"
      variant="secondary"
      size="sm"
      :loading="isMarkingNotificationRead"
      class="text-xs"
      @click="emit('markAllAsRead')">
      Mart all as read
    </BaseButton>
  </div>
</template>
