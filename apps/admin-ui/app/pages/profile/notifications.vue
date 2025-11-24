<script setup lang="ts">
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Checkbox,
} from "@/components/ui/checkbox"
import {
  cn,
} from "@/lib/utils"

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

  <Tabs
    v-model="notificationTypeIndex"
    class="max-md:mt-2 mb-3"
    @update:model-value="handleNotificationTypeChange">
    <TabsList class="flex md:justify-end items-center w-full md:w-fit ml-auto">
      <TabsTrigger
        v-for="({ label }, index) in NOTIFICATION_TYPE"
        :value="index"
        :key="index"
        :class="cn(
          'min-w-20 cursor-pointer',
          notificationTypeIndex === index && 'text-primary',
        )">
        {{ label }}
      </TabsTrigger>
    </TabsList>
  </Tabs>

  <ul
    v-if="notifications.length"
    ref="notification-list"
    class="@container flex-1 grow shrink basis-0 pb-4 overflow-y-auto">
    <li
      v-for="notification in notifications"
      :key="notification.id"
      class="px-2 hover:bg-secondary has-[button[data-state='checked']]:bg-primary/20">
      <label class="flex items-start gap-x-2 cursor-pointer">
        <Checkbox
          :model-value="selectedNotifications.includes(notification.id)"
          :value="notification.id"
          class="mt-2.5 border-primary"
          @update:model-value="value => handleNotificationToggle(value, notification.id)" />
        <Notification
          v-bind="notification"
          :class="cn(
            notificationTypeIndex === 0 && notification.readAt && 'opacity-60',
          )" />
      </label>
    </li>
  </ul>

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
