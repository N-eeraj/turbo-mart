<script setup lang="ts">
import {
  SidebarProvider,
} from "@/components/ui/sidebar"
</script>

<template>
  <SidebarProvider>
    <LayoutSidebar />

    <section class="flex flex-col w-full min-h-svh">
      <LayoutAppBar />
      <main class="flex-1 p-2 md:p-4">
        <slot />
      </main>
    </section>
  </SidebarProvider>
</template>
