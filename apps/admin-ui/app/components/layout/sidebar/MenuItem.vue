<script setup lang="ts">
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import type {
  NavigationItem,
} from "@/types/sidebar"

const props = defineProps<NavigationItem>()

const route = useRoute()

const isActive = computed(() => props.url === route.path)
</script>

<template>
  <SidebarMenuItem class="text-sm">
    <NuxtLink
      :to="url"
      class="flex flex-row items-center gap-x-2 [font-size:inherit]">
      <SidebarMenuButton
        :is-active
        class="[font-size:inherit] cursor-pointer"
        :class="{
          'text-primary!': isActive,
        }">
        <Icon
          :name="icon ?? 'lucide:home'"
          class="shrink-0"
          :class="{
            'invisible': !icon,
          }" />
        <span class="[font-size:inherit]">
          {{ title }}
        </span>
      </SidebarMenuButton>
    </NuxtLink>
  </SidebarMenuItem>
</template>
