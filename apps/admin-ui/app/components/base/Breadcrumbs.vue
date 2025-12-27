<script setup lang="ts">
import type {
  Breadcrumb,
} from "@/types/breadcrumb"

interface Props {
  items: Array<Breadcrumb>
  hideHome?: boolean
}
const props = defineProps<Props>()

const HOME = {
  text: "Home",
  url: "/",
  icon: "lucide:home"
} satisfies Breadcrumb
const breadcrumbs = computed(() => ([
  ...(!props.hideHome ? [HOME] : []),
  ...props.items,
]))
</script>

<template>
  <ul class="flex items-center gap-x-2 text-sm text-foreground/75">
    <li
      v-for="({ text, url, icon }, index) in breadcrumbs"
      :key="index"
      class="flex items-center gap-x-0.5 hover:text-foreground duration-300"
      :class="{
        'text-primary hover:text-primary/85': index + 1 === breadcrumbs.length,
      }">
      <NuxtLink
        :to="url"
        class="flex items-center gap-x-1">
        <slot name="item">
          <Icon
            v-if="icon"
            :name="icon" />
          <span>
            {{ text }}
          </span>
        </slot>
      </NuxtLink>
      <Icon
        v-if="index + 1 < breadcrumbs.length"
        name="lucide:chevron-right" />
    </li>
  </ul>
</template>
