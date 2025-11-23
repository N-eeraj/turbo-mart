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
      <main class="flex flex-col flex-1 px-4 py-2 md:py-4">
        <slot />
      </main>
    </section>
  </SidebarProvider>
</template>
