<script setup lang="ts">
import {
  cn,
} from "@/lib/utils"

const {
  notificationTypeIndex,
  currentNotificationType,
  notifications,
  isLoadingNotifications,

  selectedNotifications,
} = useAllNotifications()
</script>

<template>
  <h1 class="w-full text-xl md:text-2xl font-medium">
    Notifications
  </h1>

  <NotificationTabs />

  <NotificationList
    v-if="notifications.length"
    :mute-read="!notificationTypeIndex"
    :class="cn(
      selectedNotifications.length && 'pb-11 md:pb-13',
    )" />

  <!-- Empty state -->
  <div
    v-else-if="!isLoadingNotifications"
    class="flex flex-col justify-center items-center gap-y-1 flex-1">
    <strong>
      You're all caught up
    </strong>
    <span class="text-foreground/60 text-sm">
      You have no
      <template v-if="notificationTypeIndex !== 0">
        {{ currentNotificationType.label }}
      </template>
      Notifications
    </span>
  </div>

  <BaseLinearProgress v-if="isLoadingNotifications" />

  <NotificationActions />
</template>
