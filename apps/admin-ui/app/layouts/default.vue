<script setup lang="ts">
import {
  SidebarProvider,
  Sidebar,
} from "@/components/ui/sidebar"
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <LayoutSidebarHeader />
    </Sidebar>

    <main class="w-full min-h-svh overflow-hidden">
      <LayoutAppBar />
      <section class="p-2 md:p-4">
        <slot />
      </section>
    </main>
  </SidebarProvider>
</template>
