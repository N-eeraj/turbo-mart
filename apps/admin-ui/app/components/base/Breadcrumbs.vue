<script setup lang="ts">
import type {
  Breadcrumb,
} from "@/types/breadcrumb"

interface Props {
  items: Array<Breadcrumb>
  hideHome?: boolean
  separationIcon?: string
}
const props = withDefaults(defineProps<Props>(), {
  separationIcon: "lucide:chevron-right"
})

const HOME = {
  text: "Home",
  url: "/",
  icon: "lucide:home"
} satisfies Breadcrumb

const route = useRoute()

const breadcrumbs = computed(() => ([
  ...(!props.hideHome ? [HOME] : []),
  ...props.items
    .map(({ url, ...item }) => ({
      ...item,
      url: url.replace(/\{(\w+)\}/g, (_, key) => route.params[key] as string)
    })),
]))
</script>

<template>
  <ul class="flex items-center flex-wrap gap-x-1 gap-y-1 text-sm text-foreground/75">
    <li
      v-for="(item, index) in breadcrumbs"
      :key="index"
      class="flex items-center gap-x-1 hover:text-foreground duration-300"
      :class="{
        'text-primary hover:text-primary/85': index + 1 === breadcrumbs.length,
      }">
      <NuxtLink
        :to="item.url"
        class="flex items-center gap-x-1">
        <slot
          name="item"
          v-bind="item">
          <Icon
            v-if="item.icon"
            :name="item.icon" />
          <span>
            {{ item.text }}
          </span>
        </slot>
      </NuxtLink>
      <Icon
        v-if="index + 1 < breadcrumbs.length"
        :name="separationIcon" />
    </li>
  </ul>
</template>
