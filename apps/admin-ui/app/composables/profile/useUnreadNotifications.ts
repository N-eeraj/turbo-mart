import {
  toast,
} from "vue-sonner"
import {
  NotificationType,
} from "@app/database/mongoose/enums/admin/notification"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, unknown>
  createdAt: Date
}

const NOTIFICATION_QUERY_LIMIT = 6 as const

export default function useUnreadNotifications() {
  const {
    data: unreadNotificationCount,
    pending: isLoadingUnreadNotificationCount,
  } = useLazyAsyncData(() => useApi("/profile/notifications/unread-count"), {
    transform: ({ data }) => {
      return (data ?? 0) as number
    },
  })
  
  const notifications = ref<Array<Notification>>([])
  const endOfList = ref(false)
  
  // data fetching
  const {
    data: notificationsData,
    pending: isLoadingNotifications,
    refresh: fetchNotifications,
  } = useLazyAsyncData(() => useApi("/profile/notifications", {
    query: {
      skip: notifications.value.length,
      limit: NOTIFICATION_QUERY_LIMIT,
      isRead: false,
    },
  }), {
    immediate: false,
    transform: ({ data }) => {
      return (data ?? []) as Array<Notification>
    },
  })
  watch(() => notificationsData.value, (notification) => {
    if (notification) {
      notifications.value.push(...notification)
      endOfList.value = notification.length < NOTIFICATION_QUERY_LIMIT
    }
  })

  const notificationListElement = useTemplateRef<HTMLElement>("notification-list")
  const {
    reset: resetInfiniteScroll,
  } = useInfiniteScroll(
    notificationListElement,
    () => {
      fetchNotifications()
    },
    {
      distance: 10,
      canLoadMore: () => {
        return !isLoadingNotifications.value && !endOfList.value
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

  return {
    unreadNotificationCount,
    notifications,
    isLoadingUnreadNotificationCount,
    isLoadingNotifications,
    isMarkingNotificationRead,
    fetchNotifications,
    resetInfiniteScroll,
    handleMarkAllAsRead,
  }
}
