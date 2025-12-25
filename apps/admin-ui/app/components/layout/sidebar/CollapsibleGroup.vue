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

interface Props {
  title: string
  items: Array<{
    title: string
    url: string
  }>
}

defineProps<Props>()
</script>

<template>
  <Collapsible
    :title
    class="group/collapsible">
    <SidebarGroup>
      <SidebarGroupLabel
        as-child
        class="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
        <CollapsibleTrigger class="cursor-pointer">
          {{ title }}
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
            v-bind="childItem" />
          </SidebarMenu>
        </SidebarGroupContent>
      </CollapsibleContent>
    </SidebarGroup>
  </Collapsible>
</template>
