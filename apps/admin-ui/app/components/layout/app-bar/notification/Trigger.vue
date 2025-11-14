<script setup lang="ts">
import {
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Spinner from "@/components/ui/spinner/Spinner.vue"

interface Props {
  unreadNotificationCount?: number
  isLoadingUnreadNotificationCount: boolean
}
defineProps<Props>()
</script>

<template>
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
</template>
