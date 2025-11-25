<script setup lang="ts">
import {
  type Notification,
} from "@/composables/profile/useUnreadNotifications"
interface Props {
  selectedNotifications: Array<Notification["id"]>
}
defineProps<Props>()

const ACTIONS = [
  {
    icon: "lucide:mail-open",
    tooltip: "Mark as Read",
    color: "primary",
    onClick: () => console.log("primary"),
  },
  {
    icon: "lucide:mail",
    tooltip: "Mark as Unread",
    color: "secondary",
    onClick: () => console.log("secondary"),
  },
  {
    icon: "lucide:trash-2",
    tooltip: "Delete",
    color: "destructive",
    onClick: () => console.log("destructive"),
  },
  {
    icon: "lucide:x",
    tooltip: "Cancel",
    color: "neutral",
    onClick: () => console.log("neutral"),
  },
] as const
</script>

<template>
  <div
    v-if="selectedNotifications.length"
    class="absolute flex justify-between items-center left-0 bottom-0 w-full px-3 md:px-6 py-2 bg-secondary">
    <span class="text-sm md:text-base">
      <strong>
        {{ selectedNotifications.length }}
      </strong>
      Notifications Selected
    </span>

    <!-- actions -->
    <ul class="flex items-center gap-x-3">
      <li
        v-for="({ onClick, ...action }, index) in ACTIONS"
        :key="index">
        <NotificationActionsButton
          v-bind="action"
          @click="onClick" />
      </li>
    </ul>
  </div>
</template>
