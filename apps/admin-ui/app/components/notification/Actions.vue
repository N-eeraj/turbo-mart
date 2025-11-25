<script setup lang="ts">
import {
  type Notification,
} from "@/composables/profile/useUnreadNotifications"

interface Props {
  selectedNotifications: Array<Notification["id"]>
}
defineProps<Props>()
</script>

<template>
  <div
    v-if="selectedNotifications.length"
    class="absolute flex justify-between items-center left-0 bottom-0 w-full px-3 md:px-6 py-2 bg-secondary">
    <span class="text-sm md:text-base">
      <strong>
        {{ selectedNotifications.length }}
      </strong>
      Notifications Selected
    </span>

    <!-- actions -->
    <ul class="flex items-center gap-x-3">
      <li>
        <BaseButton
          variant="ghost"
          class="group size-7 md:size-9 p-0 hover:bg-primary/10 rounded-full duration-200">
          <Icon
            name="lucide:mail-open"
            class="group-hover:text-primary text-lg md:text-xl" />
        </BaseButton>
      </li>
      <li>
        <BaseButton
          variant="ghost"
          class="group size-7 md:size-9 p-0 hover:bg-destructive/10 rounded-full duration-200">
          <Icon
            name="lucide:trash-2"
            class="group-hover:text-destructive text-lg md:text-xl" />
        </BaseButton>
      </li>
      <li>
        <BaseButton
          variant="ghost"
          class="group size-7 md:size-9 p-0 hover:bg-white/10 rounded-full duration-200">
          <Icon
            name="lucide:x"
            class="group-hover:text-white text-lg md:text-xl" />
        </BaseButton>
      </li>
    </ul>
  </div>
</template>
