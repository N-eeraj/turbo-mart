const ACTIONS = [
  {
    id: "markRead",
    icon: "lucide:mail-open",
    tooltip: "Mark as Read",
    color: "primary",
  },
  {
    id: "markUnread",
    icon: "clarity:email-outline-badged",
    tooltip: "Mark as Unread",
    color: "secondary",
  },
  {
    id: "delete",
    icon: "lucide:trash-2",
    tooltip: "Delete",
    color: "destructive",
  },
  {
    id: "cancel",
    icon: "lucide:x",
    tooltip: "Cancel",
    color: "neutral",
  },
] as const

export default function useNotificationActions() {
  const notificationContext = inject<AllNotificationsContext>("all-notifications")
  if (!notificationContext) {
    throw new Error("Notification context is not provided")
  }
  const {
    selectedNotifications,
  } = notificationContext

  const hasSelectedUnreadNotifications = computed(() => {
    return selectedNotifications.value
      .some(({ isRead }) => !isRead)
  })

  const hasSelectedReadNotifications = computed(() => {
    return selectedNotifications.value
      .some(({ isRead }) => isRead)
  })

  const actions = computed(() => {
    return ACTIONS
      .filter(({ id }) => {
        switch (id) {
          case "markRead":
            return hasSelectedUnreadNotifications.value
          case "markUnread":
            return hasSelectedReadNotifications.value
          case "delete":
            return true
          case "cancel":
            return true
        }
      })
  })

  const handleMarkRead = async () => {
    const notifications = selectedNotifications.value
      .reduce((acc: Array<SelectedNotification["id"]>, { id, isRead }) => {
        if (!isRead) {
          acc.push(id)
        }
        return acc
      }, [])
    console.log("mark notifications read")
    console.log(notifications)
  }

  const handleMarkUnread = async () => {
    const notifications = selectedNotifications.value
      .reduce((acc: Array<SelectedNotification["id"]>, { id, isRead }) => {
        if (isRead) {
          acc.push(id)
        }
        return acc
      }, [])
    console.log("mark notifications unread")
    console.log(notifications)
  }

  const handleDelete = async () => {
    console.log("delete notifications")
    console.log(selectedNotifications.value)
  }

  const handleCancel = () => {
    selectedNotifications.value = []
  }

  const handleAction = (actionId: typeof ACTIONS[number]["id"]) => {
    switch (actionId) {
      case "markRead":
        handleMarkRead()
        break
      case "markUnread":
        handleMarkUnread()
        break
      case "delete":
        handleDelete()
        break
      case "cancel":
        handleCancel()
        break
    }
  }

  return {
    actions,
    selectedNotifications,
    hasSelectedUnreadNotifications,
    hasSelectedReadNotifications,
    handleAction,
  }
}
