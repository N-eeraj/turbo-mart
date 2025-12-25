<script setup lang="ts">
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

interface Props {
  title: string
  url: string
}

const props = defineProps<Props>()

const route = useRoute()

const isActive = computed(() => props.url === route.path)
</script>

<template>
  <SidebarMenuItem>
    <SidebarMenuButton
      as-child
      :is-active>
      <NuxtLink :to="url">
        {{ title }}
      </NuxtLink>
    </SidebarMenuButton>
  </SidebarMenuItem>
</template>
