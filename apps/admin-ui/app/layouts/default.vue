<script setup lang="ts">
import {
  SidebarProvider,
  Sidebar,
} from "@/components/ui/sidebar"
</script>

<template>
  <SidebarProvider>
    <LayoutSidebar />

    <section class="w-full min-h-svh overflow-hidden">
      <LayoutAppBar />
      <main class="p-2 md:p-4">
        <slot />
      </main>
    </section>
  </SidebarProvider>
</template>
