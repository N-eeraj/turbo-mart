<script setup lang="ts">
import {
  Checkbox,
} from "@/components/ui/checkbox"
import {
  cn,
} from "@/lib/utils"
import {
  type Notification,
} from "@/composables/profile/useUnreadNotifications"

interface Props {
  notifications: Array<Notification>
  muteRead?: boolean
}
defineProps<Props>()

const selectedNotifications = defineModel("selection", {
  type: Array<Notification["id"]>,
})

const emit = defineEmits([
  "updateSelection",
])

function handleSelectionUpdate(value: boolean | "indeterminate", id: Notification["id"]) {
  emit("updateSelection", {
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
      class="px-2 hover:bg-secondary has-[button[data-state='checked']]:bg-primary/20">
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
