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

import {
  NotificationType,
} from "@app/database/mongoose/enums/admin/notification"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  data: Record<string, unknown>
  createdAt: Date
}

const unreadNotificationCount = ref(0)

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

        <span
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
          :key="notification.id">
          {{ notification }}
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
