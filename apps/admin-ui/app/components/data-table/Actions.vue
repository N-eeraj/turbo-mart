<script setup lang="ts">
interface Props {
  hideView?: boolean
  hideEdit?: boolean
  hideDelete?: boolean
  isDeleting?: boolean
}
const props = defineProps<Props>()

const emit = defineEmits([
  "view",
  "edit",
  "delete",
])

const actions = computed(() => ([
  {
    name: "view" as const,
    isVisible: !props.hideView,
    tooltip: {
      tooltip: "View",
      color: "neutral" as const,
    },
    button: {
      variant: "outline" as const,
      disabled: props.isDeleting,
    },
    icon: "lucide:eye",
  },
  {
    name: "edit" as const,
    isVisible: !props.hideEdit,
    tooltip: {
      tooltip: "Edit",
      color: "neutral" as const,
    },
    button: {
      variant: "outline" as const,
      disabled: props.isDeleting,
    },
    icon: "lucide:pen",
  },
  {
    name: "delete" as const,
    isVisible: !props.hideDelete,
    tooltip: {
      tooltip: "Delete",
      color: "destructive" as const,
    },
    button: {
      variant: "ghost" as const,
      loading: props.isDeleting,
      class: "hover:bg-destructive/20 text-destructive hover:text-destructive duration-300",
    },
    icon: "lucide:trash-2",
  },
]))
</script>

<template>
  <div class="flex items-center gap-x-2">
    <slot
      v-for="({ name, isVisible, tooltip, button, icon }) in actions"
      :name
      :is-visible>
      <BaseTooltip
        v-if="isVisible"
        v-bind="tooltip">
        <BaseButton
          v-bind="button"
          size="icon"
          @click="emit(name)">
          <Icon :name="icon" />
        </BaseButton>
      </BaseTooltip>
    </slot>
  </div>
</template>
