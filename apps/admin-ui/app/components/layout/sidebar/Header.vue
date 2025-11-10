<script setup lang="ts">
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
</script>

<template>
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem class="flex flex-row items-center gap-x-4">
        <NuxtLink
          to="/"
          class="w-full">
          <SidebarMenuButton
            size="lg"
            class="cursor-pointer">
            <img
              src="/images/admin-logo-white.svg"
              alt="Turbo Mart Admin Logo"
              class="size-full max-w-12 md:max-w-10" />
            <div class="grid flex-1 text-left text-sm leading-tight">
              <h2 class="text-3xl md:text-2xl font-semibold truncate">
                Turbo Mart
              </h2>
            </div>
          </SidebarMenuButton>
        </NuxtLink>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
</template>
