<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"

const {
  user,
  userInitials,
  profilePicture,
  openProfilePictureView,
  toggleProfilePictureView,
} = useProfilePicture()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      as="div"
      class="relative group cursor-pointer">
      <Avatar class="size-30 md:size-36">
        <AvatarImage
          :src="profilePicture"
          alt="user.name"
          class="object-cover" />
        <AvatarFallback class="text-primary text-4xl">
          {{ userInitials }}
        </AvatarFallback>
      </Avatar>

      <div class="absolute top-0 left-0 hidden group-hover:flex flex-col justify-center items-center size-full p-2 bg-black/50 text-sm text-center leading-tight rounded-full backdrop-blur-[2px] z-10">
        <template v-if="profilePicture">
          <Icon
            name="material-symbols:imagesmode-rounded"
            :size="24"
            class="mb-1" />
          Change
        </template>
        <template v-else>
          Add
        </template>
        profile photo
      </div>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuGroup class="min-w-48">
        <DropdownMenuItem
          v-if="profilePicture"
          class="cursor-pointer"
          @click="toggleProfilePictureView">
          <DropdownMenuShortcut class="ml-0">
            <Icon
              name="lucide:eye"
              class="text-base" />
          </DropdownMenuShortcut>
          <span class="text-muted-foreground">
            View Photo
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem class="cursor-pointer">
          <DropdownMenuShortcut class="ml-0">
            <Icon
              name="lucide:camera"
              class="text-base" />
          </DropdownMenuShortcut>
          <span class="text-muted-foreground">
            Take Photo
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem class="cursor-pointer">
          <DropdownMenuShortcut class="ml-0">
            <Icon
              name="lucide:folder-open"
              class="text-base" />
          </DropdownMenuShortcut>
          <span class="text-muted-foreground">
            Upload Photo
          </span>
        </DropdownMenuItem>

        <template v-if="profilePicture">
          <DropdownMenuSeparator />

          <DropdownMenuItem class="hover:bg-destructive/20! hover:*:text-red-300! cursor-pointer">
            <DropdownMenuShortcut class="ml-0">
              <Icon
                name="lucide:trash-2"
                class="text-base" />
            </DropdownMenuShortcut>
            <span class="text-muted-foreground">
              Remove Photo
            </span>
          </DropdownMenuItem>
        </template>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>

  <ProfilePictureView
    :open="openProfilePictureView"
    :src="profilePicture"
    :alt="user?.name"
    @close="toggleProfilePictureView" />
</template>
