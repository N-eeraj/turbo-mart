<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Spinner from "@/components/ui/spinner/Spinner.vue"

import {
  NotificationType,
} from "@app/database/mongoose/enums/admin/notification"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, unknown>
  createdAt: Date
}

const {
  data: unreadNotificationCount,
  pending: isLoadingUnreadNotificationCount,
} = useLazyAsyncData(() => useApi("/profile/notifications/unread-count"), {
  transform: ({ data }) => {
    return (data ?? 0) as number
  }
})

const {
  data: notifications,
  pending,
  refresh,
} = useLazyAsyncData(() => useApi("/profile/notifications"), {
  immediate: false,
  transform: ({ data }) => {
    return (data ?? []) as Array<Notification>
  }
})

const handleNotificationFetch = (menuOpen: boolean) => {
  if (!menuOpen) return
  refresh()
}

const handleMarkAllAsRead = async () => {
  console.log("Mark notifications read")
}
</script>

<template>
  <DropdownMenu @update:open="handleNotificationFetch">
    <DropdownMenuTrigger as-child>
      <BaseButton
        variant="secondary"
        class="relative size-10 text-center content-center p-0">
        <Icon
          name="lucide:bell"
          :size="24" />

        <div
          v-if="isLoadingUnreadNotificationCount"
          class="absolute -top-2 -right-2 grid place-content-center size-5 p-1 bg-primary text-primary-foreground leading-none rounded-lg">
          <Spinner />
        </div>

        <span
          v-else-if="unreadNotificationCount"
          class="absolute -top-2 min-w-5 p-1 bg-primary text-primary-foreground leading-none rounded-lg"
          :class="unreadNotificationCount < 100 ? '-right-2' : '-right-4'">
          {{ unreadNotificationCount < 100 ? unreadNotificationCount : "99+" }}
        </span>
      </BaseButton>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>
        All Notifications
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuGroup class="max-h-48 overflow-y-auto">
        <DropdownMenuItem
          v-for="notification of notifications"
          :key="notification.id"
          class="flex flex-col items-start">
          <strong class="leading-none">
            {{ notification.title }}
          </strong>
          <p class="text-sm text-foreground/70 line-clamp-2">
            {{ notification.message }}
          </p>
          <span class="w-full text-xs text-foreground/70 text-end">
            {{ useTimeAgo(notification.createdAt) }}
          </span>
        </DropdownMenuItem>
        <BaseLinearProgress v-if="pending" />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />

      <div class="flex justify-between items-center px-2 py-1">
        <NuxtLink
          to="/profile/notifications">
          <BaseButton
            variant="link"
            class="p-0 text-primary text-xs">
            View all
          </BaseButton>
        </NuxtLink>
        <BaseButton
          variant="secondary"
          size="sm"
          class="text-xs"
          @click="handleMarkAllAsRead">
          Mart all as read
        </BaseButton>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
