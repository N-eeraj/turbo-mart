<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const {
  unreadNotificationCount,
  notifications,
  isLoadingUnreadNotificationCount,
  isLoadingNotifications,
  isMarkingNotificationRead,
  fetchNotifications,
  resetInfiniteScroll,
  handleMarkAllAsRead,
} = useNotifications()

const handleDropDownOpen = (menuOpen: boolean) => {
  if (menuOpen) {
    notifications.value = []
    fetchNotifications()
  } else {
    resetInfiniteScroll()
  }
}
</script>

<template>
  <DropdownMenu @update:open="handleDropDownOpen">
    <LayoutAppBarNotificationTrigger
      :unread-notification-count
      :is-loading-unread-notification-count />

    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>
        Unread Notifications
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <!-- unread notifications list -->
      <DropdownMenuGroup
        v-if="isLoadingNotifications || notifications.length"
        ref="notification-list"
        as="ul"
        class="max-h-48 overflow-y-auto">
        <DropdownMenuItem
          v-for="notification of notifications"
          :key="notification.id"
          as="li">
          <Notification v-bind="notification" />
        </DropdownMenuItem>
        <BaseLinearProgress v-if="isLoadingNotifications" />
      </DropdownMenuGroup>

      <!-- empty state -->
      <div
        v-else
        class="flex flex-col justify-center items-center min-h-24">
        <strong class="text-sm">
          You're all caught up
        </strong>
        <span class="text-foreground/60 text-xs">
          You have no Unread Notifications
        </span>
      </div>

      <DropdownMenuSeparator />

      <LayoutAppBarNotificationActions
        :unread-notification-count
        :is-marking-notification-read
        @mark-all-as-read="handleMarkAllAsRead" />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
