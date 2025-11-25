import {
  type Notification,
} from "@/composables/profile/useUnreadNotifications"

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

export default function useNotificationPage() {
  const route = useRoute()
  const router = useRouter()

  // notifications fetching and listing
  const notificationTypeIndex = ref(0)
  const notifications = ref<Array<Notification>>([])
  const endOfList = ref(false)

  const currentNotificationType = computed(() => NOTIFICATION_TYPE[notificationTypeIndex.value])

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
  const selectedNotifications = ref<Array<Notification["id"]>>([])
  const handleNotificationToggle = ({ value, id }: {
    value: boolean | "indeterminate"
    id: Notification["id"]
  }) => {
    if (value === "indeterminate") return
    if (value) {
      selectedNotifications.value.push(id)
    } else {
      selectedNotifications.value = selectedNotifications.value.filter(notificationId => notificationId !== id)
    }
  }

  return {
    NOTIFICATION_TYPE,
    notificationTypeIndex,
    currentNotificationType,
    notifications,
    isLoadingNotifications,
    handleNotificationTypeChange,

    selectedNotifications,
    handleNotificationToggle,
  }
}
