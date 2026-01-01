<script setup lang="ts">
const {
  actions,
  selectedNotifications,
  handleAction,
} = useNotificationActions()
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

    <!-- Actions -->
    <ul class="flex items-center gap-x-3">
      <li
        v-for="({ id, ...action }) in actions"
        :key="id">
        <NotificationActionsButton
          v-bind="action"
          @click="handleAction(id)" />
      </li>
    </ul>
  </div>
</template>
