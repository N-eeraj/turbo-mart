<script setup lang="ts">
import {
  VIEW_CATEGORY,
} from "~/constants/categories/breadcrumbs"

const {
  data: categoryData,
  isLoading: categoryLoading,
} = useCategoryData()

const {
  showConfirmation,
  isLoading: isDeleting,
  onDelete,
  confirm: confirmDelete,
  cancel: cancelDelete,
} = useCategoryDelete()

async function handleDelete() {
  await onDelete(
    categoryData.value.id,
    {
      onSuccess: () => navigateTo("/catalogue/categories", {
        replace: true,
      }),
    }
  )
}
</script>

<template>
  <BaseHeader
    title="View Category"
    :breadcrumbs="VIEW_CATEGORY">
    <template
      #right
      v-if="categoryData">
      <div class="flex items-center gap-x-3">
        <BaseTooltip tooltip="Edit">
          <NuxtLink
            :to="`/catalogue/categories/${categoryData.slug}/edit`"
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

  <BaseLinearProgress v-if="categoryLoading" />
  <template v-else>
    <CatalogueCategoryDetails
      v-bind="categoryData"
      class="mt-4" />
    <CatalogueCategorySubcategories :category-id="categoryData.id" />
  </template>

  <BaseConfirmation
    :open="showConfirmation"
    variant="destructive"
    @confirm="confirmDelete"
    @cancel="cancelDelete">
    <template #description>
      You are about to delete this category.
      This action is irreversible, are you sure you want to continue?
    </template>
  </BaseConfirmation>
</template>
