<script setup lang="ts">
import {
  Sidebar,
} from "@/components/ui/sidebar"
</script>

<template>
  <Sidebar collapsible="icon">
    <LayoutSidebarHeader />
    <LayoutSidebarContent />
  </Sidebar>
</template>

<style>
/* open mobile sidebar UI */
[data-state="open"][data-mobile="true"][data-sidebar="sidebar"] {
  z-index: 150 !important;
}
</style>
