<script setup lang="ts">
import {
  VIEW_SUBCATEGORY,
} from "~/constants/subcategories/breadcrumbs"

const {
  data: subcategoryData,
  isLoading: subcategoryLoading,
} = useSubcategoryData()

const {
  showConfirmation,
  isLoading: isDeleting,
  onDelete,
  confirm: confirmDelete,
  cancel: cancelDelete,
} = useSubcategoryDelete()

async function handleDelete() {
  await onDelete(
    subcategoryData.value.id,
    {
      onSuccess: () => navigateTo("/catalogue/subcategories", {
        replace: true,
      }),
    }
  )
}
</script>

<template>
  <BaseHeader
    :title="subcategoryData?.name"
    :breadcrumbs="VIEW_SUBCATEGORY">
    <template
      #right
      v-if="subcategoryData">
      <div class="flex items-center gap-x-3">
        <BaseTooltip tooltip="Edit">
          <NuxtLink
            :to="`/catalogue/subcategories/${subcategoryData.slug}/edit`"
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
            @click="handleDelete">
            <Icon name="lucide:trash-2" />
          </BaseButton>
        </BaseTooltip>
      </div>
    </template>
  </BaseHeader>

  <BaseLinearProgress v-if="subcategoryLoading" />

  <CatalogueSubcategoryDetails
    v-else
    v-bind="subcategoryData"
    class="mt-4" />

  <BaseConfirmation
    :open="showConfirmation"
    variant="destructive"
    @confirm="confirmDelete"
    @cancel="cancelDelete">
    <template #description>
      You are about to delete this subcategory.
      This action is irreversible, are you sure you want to continue?
    </template>
  </BaseConfirmation>
</template>
