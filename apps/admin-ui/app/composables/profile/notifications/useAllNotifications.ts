import {
  type Notification,
} from "@/composables/profile/notifications/useUnreadNotifications"

const NOTIFICATION_TYPE = [
  {
    label: "All",
    value: undefined,
  },
  {
    label: "Unread",
    value: false,
  },
  {
    label: "Read",
    value: true,
  },
] as const

const NOTIFICATION_QUERY_LIMIT = 12 as const

export interface HandleNotificationToggleParameters {
  value: boolean | "indeterminate"
  id: Notification["id"]
}

export interface SelectedNotification {
  id: Notification["id"]
  isRead: boolean
}

export interface AllNotificationsContext {
  NOTIFICATION_TYPE: typeof NOTIFICATION_TYPE
  notificationTypeIndex: Ref<number>
  currentNotificationType: ComputedRef<typeof NOTIFICATION_TYPE[number]>
  notifications: Ref<Array<Notification>>
  isLoadingNotifications: Ref<boolean>
  handleNotificationTypeChange: (value: string | number) => void

  selectedNotifications: Ref<Array<SelectedNotification>>
  handleNotificationToggle: (parameters: HandleNotificationToggleParameters) => void
}

export default function useAllNotifications() {
  const route = useRoute()
  const router = useRouter()

  // notifications fetching and listing
  const notificationTypeIndex = ref(0)
  const notifications = ref<Array<Notification>>([])
  const endOfList = ref(false)

  const currentNotificationType = computed<typeof NOTIFICATION_TYPE[number]>(() => NOTIFICATION_TYPE[notificationTypeIndex.value]!)

  const {
    data: notificationsData,
    pending: isLoadingNotifications,
    refresh: fetchNotifications,
  } = useLazyAsyncData(() => useApi("/profile/notifications", {
    query: {
      skip: notifications.value.length,
      limit: NOTIFICATION_QUERY_LIMIT,
      isRead: currentNotificationType.value?.value,
    },
  }), {
    transform: ({ data }) => {
      return (data ?? []) as Array<Notification>
    },
    watch: [
      () => notificationTypeIndex.value,
    ],
  })

  watch(() => notificationsData.value, (notification) => {
    if (notification) {
      notifications.value.push(...notification)
      endOfList.value = notification.length < NOTIFICATION_QUERY_LIMIT
    }
  })

  const handleNotificationTypeChange = (value: string | number) => {
    const type = NOTIFICATION_TYPE[Number(value)]?.label.toLowerCase() ?? ""
    notifications.value = []
    endOfList.value = false
    resetInfiniteScroll()
    router.replace({
      ...route,
      query: {
        ...route.query,
        type,
      },
    })
  }

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

  onMounted(() => {
    notificationTypeIndex.value = Math.max(
      0,
      NOTIFICATION_TYPE
        .findIndex(({ label }) => label.toLocaleLowerCase() === route.query.type)
    )
  })

  onBeforeUnmount(() => {
    resetInfiniteScroll()
  })

  // notification actions
  const selectedNotifications = ref<Array<SelectedNotification>>([])
  const handleNotificationToggle = ({ value, id }: HandleNotificationToggleParameters) => {
    if (value === "indeterminate") return
    if (value) {
      selectedNotifications.value.push({
        id,
        isRead: Boolean(
          notifications.value.find(notification => notification.id === id)?.readAt
        ),
      })
    } else {
      selectedNotifications.value = selectedNotifications.value.filter((notification) => notification.id !== id)
    }
  }

  const allNotificationsContext: AllNotificationsContext = {
    NOTIFICATION_TYPE,
    notificationTypeIndex,
    currentNotificationType,
    notifications,
    isLoadingNotifications,
    handleNotificationTypeChange,

    selectedNotifications,
    handleNotificationToggle,
  }

  provide<AllNotificationsContext>("all-notifications", allNotificationsContext)

  return allNotificationsContext
}
