<script setup lang="ts">
import {
  VIEW_BRAND,
} from "~/constants/breadcrumbs"

const {
  data: brandData,
  isLoading: brandLoading,
} = useBrandData()

const {
  showConfirmation,
  isLoading: isDeleting,
  onDelete,
  confirm: confirmDelete,
  cancel: cancelDelete,
} = useBrandDelete()

async function handleDelete() {
  await onDelete(
    brandData.value.id,
    {
      onSuccess: () => navigateTo("/catalogue/brands", {
        replace: true,
      }),
    }
  )
}
</script>

<template>
  <BaseHeader
    title="View Brand"
    :breadcrumbs="VIEW_BRAND">
    <template
      #right
      v-if="brandData">
      <div class="flex items-center gap-x-3">
        <BaseTooltip tooltip="Edit">
          <NuxtLink
            :to="`/catalogue/brands/${brandData.slug}/edit`"
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

  <BaseLinearProgress v-if="brandLoading" />

  <CatalogueBrandDetails
    v-else
    v-bind="brandData"
    class="mt-4" />

  <BaseConfirmation
    :open="showConfirmation"
    variant="destructive"
    @confirm="confirmDelete"
    @cancel="cancelDelete">
    <template #description>
      You are about to delete this brand.
      This action is irreversible, are you sure you want to continue?
    </template>
  </BaseConfirmation>
</template>
