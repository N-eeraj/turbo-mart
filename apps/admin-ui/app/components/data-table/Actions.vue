<script setup lang="ts">
interface Props {
  hideView?: boolean
  hideEdit?: boolean
  hideDelete?: boolean
  isDeleting?: boolean
}
defineProps<Props>()

const emit = defineEmits([
  "view",
  "edit",
  "delete",
])
</script>

<template>
  <div class="flex items-center gap-x-2">
    <slot
      v-if="!hideView"
      name="view">
      <BaseTooltip tooltip="View">
        <BaseButton
          variant="outline"
          size="icon"
          :disabled="isDeleting"
          @click="emit('view')">
          <Icon name="lucide:eye" />
        </BaseButton>
      </BaseTooltip>
    </slot>

    <slot
      v-if="!hideEdit"
      name="edit"
      :hide-edit>
      <BaseTooltip tooltip="Edit">
        <BaseButton
          variant="outline"
          size="icon"
          :disabled="isDeleting"
          @click="emit('edit')">
          <Icon name="lucide:pen" />
        </BaseButton>
      </BaseTooltip>
    </slot>

    <slot
      v-if="!hideDelete"
      name="delete"
      :hide-delete>
      <BaseTooltip
        tooltip="Delete"
        color="destructive">
        <BaseButton
          variant="ghost"
          size="icon"
          :loading="isDeleting"
          class="hover:bg-destructive/20 text-destructive hover:text-destructive duration-300"
          @click="emit('delete')">
          <Icon name="lucide:trash-2" />
        </BaseButton>
      </BaseTooltip>
    </slot>
  </div>
</template>
