<script setup lang="ts">
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
</script>

<template>
  <div class="sticky top-0 flex justify-between items-center h-12 md:h-16 pl-2 pr-3 bg-app-bar">
    <SidebarTrigger class="cursor-pointer" />

    <div class="flex items-center gap-x-2 md:gap-x-4">
      <LayoutAppBarNotification />
      <LayoutAppBarProfile />
    </div>
  </div>
</template>
