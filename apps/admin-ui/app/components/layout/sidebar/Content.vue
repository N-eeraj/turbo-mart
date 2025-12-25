<script setup lang="ts">
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"

const navigation = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Admin Management",
    collapsible: true,
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
  {
    title: "Catalogue Management",
    items: [
      {
        title: "Categories",
        url: "/catalogue/categories",
      },
      {
        title: "Subcategories",
        url: "/catalogue/subcategories",
      },
      {
        title: "Brands",
        url: "/catalogue/brands",
      },
      {
        title: "Products",
        url: "/catalogue/products",
      },
    ],
  },
]
</script>

<template>
  <SidebarContent class="gap-0">
    <template
      v-for="item in navigation">
      <template v-if="item.items">
        <!-- Collapsible Menu Items -->
        <LayoutSidebarCollapsibleGroup
          v-if="item.collapsible"
          v-bind="item" />

        <!-- Grouped Menu Items -->
        <SidebarGroup v-else>
          <SidebarGroupLabel>
            {{ item.title }}
          </SidebarGroupLabel>
          <SidebarMenu>
            <LayoutSidebarMenuItem
              v-for="childItem in item.items"
              :key="childItem.title"
              v-bind="childItem" />
          </SidebarMenu>
        </SidebarGroup>
      </template>

      <!-- Individual Menu Item -->
      <SidebarGroup v-else>
        <SidebarMenu>
          <LayoutSidebarMenuItem v-bind="item" />
        </SidebarMenu>
      </SidebarGroup>
    </template>
  </SidebarContent>
</template>
