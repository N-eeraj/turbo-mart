<script setup lang="ts">
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"

const userStore = useUserStore()
const {
  user,
} = storeToRefs(userStore)

const userInitials = computed(() => user.value?.name.split(" ", 2).map(([i]) => i?.toUpperCase()).join(""))
</script>

<template>
  <div class="flex justify-between items-center h-12 pl-2 pr-3 bg-app-bar">
    <SidebarTrigger class="cursor-pointer" />
    <div class="flex items-center gap-x-2">
      <Avatar>
        <AvatarImage
          :src="user?.profilePicture ?? ''"
          alt="user.name" />
        <AvatarFallback>
          {{ userInitials }}
        </AvatarFallback>
      </Avatar>
      <strong class="text-sm">
        {{ user?.name }}
      </strong>
    </div>
  </div>
</template>
