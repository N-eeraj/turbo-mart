<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
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


const showLogoutConfirmation = ref(false)
function openConfirmation() {
  showLogoutConfirmation.value = true
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="flex items-center gap-x-2 h-full cursor-pointer">
      <Avatar class="size-10">
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
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuLabel>
        My Account
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      <NuxtLink to="/profile">
        <DropdownMenuItem class="cursor-pointer">
          <span>
            Profile
          </span>
          <DropdownMenuShortcut>
            <Icon name="lucide:user" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </NuxtLink>

      <DropdownMenuItem
        class="cursor-pointer"
        @click="openConfirmation">
        <span>
          Logout
        </span>
        <DropdownMenuShortcut>
          <Icon name="lucide:log-out" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <LayoutAppBarProfileLogoutConfirmation v-model="showLogoutConfirmation" />
</template>
