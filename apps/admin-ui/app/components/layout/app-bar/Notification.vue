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
  toast,
} from "vue-sonner"
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

const notifications = ref<Array<Notification>>([])

const NOTIFICATION_QUERY_LIMIT = 10
const endOfList = ref(false)

// data fetching
const {
  data: notificationsData,
  pending,
  refresh,
} = useLazyAsyncData(() => useApi("/profile/notifications", {
  query: {
    skip: notifications.value.length,
    limit: NOTIFICATION_QUERY_LIMIT,
    isRead: false,
  }
}), {
  immediate: false,
  transform: ({ data }) => {
    return (data ?? []) as Array<Notification>
  }
})
watch(() => notificationsData.value, (notification) => {
  if (notification) {
    notifications.value.push(...notification)
    endOfList.value = notification.length < NOTIFICATION_QUERY_LIMIT
  }
})

const handleDropDownOpen = (menuOpen: boolean) => {
  if (menuOpen) {
    refresh()
  } else {
    notifications.value = []
    reset()
  }
}

const notificationListElement = useTemplateRef<HTMLElement>("notification-list")
const {
  reset,
} = useInfiniteScroll(
  notificationListElement,
  () => {
    refresh()
  },
  {
    distance: 10,
    canLoadMore: () => {
      return !pending.value && !endOfList.value
    },
  }
)

const isMarkingNotificationRead = ref(false)
const handleMarkAllAsRead = async () => {
  try {
    isMarkingNotificationRead.value = true
    const {
      message,
    } = await useApi("/profile/notifications", {
      method: "PATCH",
      body: {
        read: true,
      }
    })
    notifications.value = []
    unreadNotificationCount.value = 0
    toast.success(message)
  } catch (error: unknown) {
    const {
      message,
    } = error as ApiError
    toast.error(message)
  } finally {
    isMarkingNotificationRead.value = false
  }
}
</script>

<template>
  <DropdownMenu @update:open="handleDropDownOpen">
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

      <DropdownMenuGroup
        v-if="pending || notifications.length"
        ref="notification-list"
        as="ul"
        class="max-h-48 overflow-y-auto">
        <DropdownMenuItem
          v-for="notification of notifications"
          :key="notification.id"
          as="li"
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

      <div class="flex justify-between items-center px-2">
        <NuxtLink
          to="/profile/notifications">
          <BaseButton
            variant="link"
            class="p-0 text-primary text-xs">
            View all
          </BaseButton>
        </NuxtLink>
        <BaseButton
          v-if="unreadNotificationCount"
          variant="secondary"
          size="sm"
          :loading="isMarkingNotificationRead"
          class="text-xs"
          @click="handleMarkAllAsRead">
          Mart all as read
        </BaseButton>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
