<script setup lang="ts">
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

interface Props {
  title: string
  url: string
  icon?: string
}

const props = defineProps<Props>()

const route = useRoute()

const isActive = computed(() => props.url === route.path)
</script>

<template>
  <SidebarMenuItem>
    <NuxtLink
      :to="url"
      class="flex flex-row items-center gap-x-2">
      <SidebarMenuButton :is-active>
        <Icon
          :name="icon ?? 'lucide:home'"
          class="shrink-0"
          :class="{
            'invisible': !icon,
          }" />
        <span>
          {{ title }}
        </span>
      </SidebarMenuButton>
    </NuxtLink>
  </SidebarMenuItem>
</template>
