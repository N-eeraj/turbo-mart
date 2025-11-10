<script setup lang="ts">
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar"
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <LayoutSidebarHeader />
    </Sidebar>

    <main class="w-full min-h-svh overflow-hidden">
      <div class="flex justify-between items-center h-12 px-2 bg-app-bar">
        <SidebarTrigger class="cursor-pointer" />
      </div>
      <section class="p-2 md:p-4">
        <slot />
      </section>
    </main>
  </SidebarProvider>
</template>
