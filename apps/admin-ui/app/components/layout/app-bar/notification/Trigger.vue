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
      class="relative size-8 md:size-10 text-center content-center p-0">
      <Icon
        name="lucide:bell"
        class="text-lg md:text-xl" />

      <Spinner
        v-if="isLoadingUnreadNotificationCount"
        class="absolute -top-2 -right-2 size-3.5 md:size-5 text-primary stroke-3" />
      <span
        v-else-if="unreadNotificationCount"
        class="absolute -top-2 md:min-w-5 p-0.5 md:p-1 bg-primary text-primary-foreground text-xs md:text-sm leading-none rounded-lg"
        :class="unreadNotificationCount < 100 ? '-right-2' : '-right-4'">
        {{ unreadNotificationCount < 100 ? unreadNotificationCount : "99+" }}
      </span>
    </BaseButton>
  </DropdownMenuTrigger>
</template>
