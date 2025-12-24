<script setup lang="ts">
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const navigation = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Admin Management",
    items: [
      {
        title: "All Admins",
        url: "/admin",
      },
      {
        title: "Create Admin",
        url: "/admin/create",
      },
    ],
  },
]
</script>

<template>
  <SidebarContent class="gap-0">
    <template
      v-for="item in navigation">
      <Collapsible
        v-if="item.items"
        :key="item.title"
        :title="item.title"
        default-open
        class="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel
            as-child
            class="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <CollapsibleTrigger class="cursor-pointer">
              {{ item.title }}
              <Icon
                name="lucide:chevron-right"
                class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem
                  v-for="childItem in item.items"
                  :key="childItem.title">
                  <SidebarMenuButton as-child>
                    <NuxtLink :to="childItem.url">
                      {{ childItem.title }}
                    </NuxtLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
      <SidebarGroup v-else>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton as-child>
              <NuxtLink :to="item.url">
                {{ item.title }}
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </template>
  </SidebarContent>
</template>
