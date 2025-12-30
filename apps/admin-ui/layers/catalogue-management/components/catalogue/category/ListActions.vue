<script setup lang="ts">
interface Props {
  id: string
  isDeleting?: boolean
}
defineProps<Props>()

const emit = defineEmits([
  "delete",
])
</script>

<template>
  <div class="flex items-center gap-x-2">
    <BaseTooltip tooltip="View">
      <NuxtLink
        :to="`/catalogue/categories/${id}`"
        :class="{
          'pointer-events-none': isDeleting,
        }">
        <BaseButton
          variant="outline"
          size="icon"
          :disabled="isDeleting">
          <Icon name="lucide:eye" />
        </BaseButton>
      </NuxtLink>
    </BaseTooltip>

    <BaseTooltip tooltip="Edit">
      <NuxtLink
        :to="`/catalogue/categories/${id}/edit`"
        :class="{
          'pointer-events-none': isDeleting,
        }">
        <BaseButton
          variant="outline"
          size="icon"
          :disabled="isDeleting">
          <Icon name="lucide:pen" />
        </BaseButton>
      </NuxtLink>
    </BaseTooltip>

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
  </div>
</template>
