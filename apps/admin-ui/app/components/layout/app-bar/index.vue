<script setup lang="ts">
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
</script>

<template>
  <div class="flex justify-between items-center h-16 pl-2 pr-3 bg-app-bar">
    <SidebarTrigger class="cursor-pointer" />

    <LayoutAppBarProfile />
  </div>
</template>
