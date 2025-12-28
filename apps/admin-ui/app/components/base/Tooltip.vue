<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"  

interface Props {
  tooltip: string
  color?: "primary" | "secondary" | "destructive" | "neutral"
}
const props = defineProps<Props>()


const tooltipClass = computed(() => {
  switch(props.color) {
    case "primary":
      return "bg-primary text-primary-foreground [&_svg]:bg-primary [&_svg]:fill-primary"
    case "secondary":
      return "bg-sky-400 text-primary-foreground [&_svg]:bg-sky-400 [&_svg]:fill-sky-400"
    case "destructive":
      return "bg-destructive text-destructive-foreground [&_svg]:bg-destructive [&_svg]:fill-destructive"
    case "neutral":
    default:
      return "bg-white text-black [&_svg]:bg-white [&_svg]:fill-white"
  }
})
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipContent :class="tooltipClass">
        <slot name="tooltip">
          <span>
            {{ tooltip }}
          </span>
        </slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
