<script setup lang="ts">
interface Props {
  hideView?: boolean
  hideEdit?: boolean
  hideDelete?: boolean
  isDeleting?: boolean
}
const props = defineProps<Props>()

interface Emits {
  view: []
  edit: []
  delete: []
}
const emit = defineEmits<Emits>()

const actions = computed(() => ([
  {
    name: "view",
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
    onClick: () => emit("view"),
  },
  {
    name: "edit",
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
    onClick: () => emit("edit"),
  },
  {
    name: "delete",
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
    onClick: () => emit("delete"),
  },
]))
</script>

<template>
  <div class="flex items-center gap-x-2">
    <slot
      v-for="({ name, isVisible, tooltip, button, icon, onClick }) in actions"
      :name
      :is-visible>
      <BaseTooltip
        v-if="isVisible"
        v-bind="tooltip">
        <BaseButton
          v-bind="button"
          size="icon"
          @click="onClick">
          <Icon :name="icon" />
        </BaseButton>
      </BaseTooltip>
    </slot>
  </div>
</template>
