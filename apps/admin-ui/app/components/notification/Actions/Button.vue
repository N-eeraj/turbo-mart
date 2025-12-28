<script setup lang="ts">
import {
  cn,
} from "@/lib/utils"

interface Props {
  icon: string
  tooltip: string
  color: "primary" | "secondary" | "destructive" | "neutral"
}
const props = defineProps<Props>()

const emit = defineEmits([
  "click",
])

const classes = computed(() => {
  switch(props.color) {
    case "primary":
      return {
        trigger: "hover:bg-primary/10",
        icon: "group-hover:text-primary",
      }
    case "secondary":
      return {
        trigger: "hover:bg-sky-400/10",
        icon: "group-hover:text-sky-400",
      }
    case "destructive":
      return {
        trigger: "hover:bg-destructive/10",
        icon: "group-hover:text-destructive",
      }
    case "neutral":
    default:
      return {
        trigger: "hover:bg-white/10",
        icon: "group-hover:text-white",
      }
  }
})
</script>

<template>
  <BaseTooltip
    :tooltip
    :color>
    <BaseButton
      variant="ghost"
      :class="cn(
        'group size-7 md:size-9 p-0 rounded-full duration-200',
        classes.trigger,
      )"
      @click="emit('click')">
      <Icon
        :name="icon"
        :class="cn(
          'text-lg md:text-xl',
          classes.icon,
        )" />
    </BaseButton>
  </BaseTooltip>
</template>
