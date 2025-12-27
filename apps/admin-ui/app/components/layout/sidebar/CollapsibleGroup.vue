<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar"
import type { NavigationGroup } from "@/types/sidebar"

defineProps<NavigationGroup>()
</script>

<template>
  <Collapsible
    :title
    class="group/collapsible">
    <SidebarGroup>
      <SidebarGroupLabel
        as-child
        class="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
        <CollapsibleTrigger class="flex items-center gap-x-2 text-sidebar-foreground/70 text-sm font-medium cursor-pointer">
          <Icon
            v-if="icon"
            :name="icon"
            class="shrink-0" />
          <span>
            {{ title }}
          </span>
          <Icon
            name="lucide:chevron-right"
            class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
        </CollapsibleTrigger>
      </SidebarGroupLabel>
      <CollapsibleContent>
        <SidebarGroupContent>
          <SidebarMenu>
          <LayoutSidebarMenuItem
            v-for="childItem in items"
            :key="childItem.title"
            v-bind="childItem"
            class="text-xs" />
          </SidebarMenu>
        </SidebarGroupContent>
      </CollapsibleContent>
    </SidebarGroup>
  </Collapsible>
</template>
