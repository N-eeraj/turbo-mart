<script setup lang="ts">
import {
  Sidebar,
} from "@/components/ui/sidebar"
</script>

<template>
  <Sidebar
    collapsible="icon"
    class="z-51">
    <LayoutSidebarHeader />
    <LayoutSidebarContent />
  </Sidebar>
</template>

<style>
/* Sidebar UI */
[data-state="open"][data-sidebar="sidebar"] {
  z-index: 150 !important;
}
</style>
