<script setup lang="ts">
import {
  Checkbox,
} from "@/components/ui/checkbox"
import {
  cn,
} from "@/lib/utils"

interface Props {
  muteRead?: boolean
}
defineProps<Props>()

const notificationContext = inject<AllNotificationsContext>("all-notifications")
if (!notificationContext) {
  throw new Error("Notification context is not provided")
}
const {
  notifications,
  selectedNotifications,
  handleNotificationToggle,
} = notificationContext

function handleSelectionUpdate(
  value: boolean | "indeterminate",
  id: typeof notifications.value[number]["id"]
) {
  handleNotificationToggle({
    id,
    value,
  })
}
</script>

<template>
  <ul
    ref="notification-list"
    class="@container flex-1 grow shrink basis-0 pb-4 overflow-y-auto">
    <li
      v-for="notification in notifications"
      :key="notification.id"
      class="px-2 hover:bg-secondary has-[button[data-state='checked']]:bg-primary/20 has-[button[data-state='checked']]:hover:bg-primary/30 duration-100">
      <label class="flex items-start gap-x-2 cursor-pointer">
        <Checkbox
          v-if="selectedNotifications"
          :model-value="selectedNotifications.includes(notification.id)"
          :value="notification.id"
          class="mt-2.5 border-primary"
          @update:model-value="value => handleSelectionUpdate(value, notification.id)" />
        <Notification
          v-bind="notification"
          :class="cn(
            muteRead && notification.readAt && 'opacity-60',
          )" />
      </label>
    </li>
  </ul>
</template>
