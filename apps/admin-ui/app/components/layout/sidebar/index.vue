<script setup lang="ts">
import {
  Sidebar,
} from "@/components/ui/sidebar"
</script>

<template>
  <Sidebar
    collapsible="icon"
    class="z-50">
    <LayoutSidebarHeader />
    <LayoutSidebarContent />
  </Sidebar>
</template>

<style>
/* Sidebar UI */
[data-state="open"][data-sidebar="sidebar"] {
  z-index: 50 !important;
}
</style>
