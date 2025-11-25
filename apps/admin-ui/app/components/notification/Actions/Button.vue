<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  cn,
} from "@/lib/utils"


interface Props {
  icon: string
  tooltip: String
  color: "primary" | "secondary" | "destructive" | "neutral"
}
const {
  color,
} = defineProps<Props>()

const emit = defineEmits([
  "click",
])

const classes = computed(() => {
  switch(color) {
    case "primary":
      return {
        trigger: "hover:bg-primary/10",
        icon: "group-hover:text-primary",
        tooltip: "bg-primary text-primary-foreground [&_svg]:bg-primary [&_svg]:fill-primary",
      }
    case "secondary":
      return {
        trigger: "hover:bg-sky-400/10",
        icon: "group-hover:text-sky-400",
        tooltip: "bg-sky-400 text-primary-foreground [&_svg]:bg-sky-400 [&_svg]:fill-sky-400",
      }
    case "destructive":
      return {
        trigger: "hover:bg-destructive/10",
        icon: "group-hover:text-destructive",
        tooltip: "bg-destructive text-destructive-foreground [&_svg]:bg-destructive [&_svg]:fill-destructive",
      }
    case "neutral":
    default:
      return {
        trigger: "hover:bg-white/10",
        icon: "group-hover:text-white",
        tooltip: "bg-white text-black [&_svg]:bg-white [&_svg]:fill-white",
      }
  }
})

</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
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
      </TooltipTrigger>
      <TooltipContent :class="cn(
        classes.tooltip,
      )">
        <span>
          {{ tooltip }}
        </span>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
