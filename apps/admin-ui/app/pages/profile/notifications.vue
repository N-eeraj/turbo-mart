<script setup lang="ts">
const {
  NOTIFICATION_TYPE,
  notificationTypeIndex,
  currentNotificationType,
  notifications,
  isLoadingNotifications,
  handleNotificationTypeChange,

  selectedNotifications,
  handleNotificationToggle,
} = useNotificationPage()
</script>

<template>
  <h1 class="w-full text-xl md:text-2xl font-medium">
    Notifications
  </h1>

  <NotificationTabs
    v-model="notificationTypeIndex"
    :tabs="NOTIFICATION_TYPE"
    @update="handleNotificationTypeChange" />

  <NotificationList
    v-if="notifications.length"
    v-model:selection="selectedNotifications"
    :notifications
    :mute-read="notificationTypeIndex === 0"
    @update-selection="handleNotificationToggle" />

  <!-- empty state -->
  <div
    v-else-if="!isLoadingNotifications"
    class="flex flex-col justify-center items-center gap-y-1 flex-1">
    <strong>
      You're all caught up
    </strong>
    <span class="text-foreground/60 text-sm">
      You have no
      <template v-if="notificationTypeIndex !== 0">
        {{ currentNotificationType?.label }}
      </template>
      Notifications
    </span>
  </div>

  <BaseLinearProgress v-if="isLoadingNotifications" />
</template>
