<script setup lang="ts">
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  cn,
} from "@/lib/utils"
import {
  type AllNotificationsContext,
} from "@/composables/profile/useNotificationPage"

const notificationContext = inject<AllNotificationsContext>("all-notifications")
if (!notificationContext) {
  throw new Error("Notification context is not provided")
}
const {
  NOTIFICATION_TYPE,
  notificationTypeIndex,
  handleNotificationTypeChange,
} = notificationContext
</script>

<template>
  <Tabs
    v-model="notificationTypeIndex"
    class="max-md:mt-2 mb-3"
    @update:model-value="value => handleNotificationTypeChange(value)">
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
</template>
