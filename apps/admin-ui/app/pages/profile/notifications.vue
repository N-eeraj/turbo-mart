<script setup lang="ts">
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  cn,
} from "@/lib/utils"

const {
  NOTIFICATION_TYPE,
  notificationTypeIndex,
  notifications,
  isLoadingNotifications,
  handleNotificationTypeChange,
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
    class="flex-1 grow shrink basis-0 pb-4 overflow-y-auto">
    <li
      v-for="notification in notifications"
      :key="notification.id">
      <Notification v-bind="notification" />
    </li>
  </ul>

  <BaseLinearProgress v-if="isLoadingNotifications" />
</template>
