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
    value: true,
  },
  {
    label: "Read",
    value: false,
  },
] as const
  
const NOTIFICATION_QUERY_LIMIT = 12 as const

export default function useNotificationPage() {
  const route = useRoute()
  const router = useRouter()

  const notificationTypeIndex = ref(0)
  const notifications = ref<Array<Notification>>([])

  const {
    data: notificationsData,
    pending: isLoadingNotifications,
  } = useLazyAsyncData(() => useApi("/profile/notifications", {
    query: {
      skip: notifications.value.length,
      limit: NOTIFICATION_QUERY_LIMIT,
      isRead: NOTIFICATION_TYPE[notificationTypeIndex.value]?.value,
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
      // endOfList.value = notification.length < NOTIFICATION_QUERY_LIMIT
    }
  })

  const handleNotificationTypeChange = (value: string | number) => {
    const type = NOTIFICATION_TYPE[Number(value)]?.label.toLowerCase() ?? ""
    notifications.value = []
    router.replace({
      ...route,
      query: {
        ...route.query,
        type,
      },
    })
  }

  onMounted(() => {
    notificationTypeIndex.value = Math.max(
      0,
      NOTIFICATION_TYPE
        .findIndex(({ label }) => label.toLocaleLowerCase() === route.query.type)
    )
  })

  return {
    NOTIFICATION_TYPE,
    notificationTypeIndex,
    notifications,
    isLoadingNotifications,
    handleNotificationTypeChange,
  }
}
