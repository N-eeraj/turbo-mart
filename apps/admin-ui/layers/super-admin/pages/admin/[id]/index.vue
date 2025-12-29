<script setup lang="ts">
import {
  VIEW_ADMIN,
} from "~/constants/breadcrumbs"

const {
  data: adminData,
  isLoading: adminLoading,
} = useAdminData()

const {
  showConfirmation,
  isLoading: isDeleting,
  onDelete,
  confirm: confirmDelete,
  cancel: cancelDelete,
} = useAdminDelete()

const route = useRoute()
async function handleDelete() {
  await onDelete(
    route.params.id,
    {
      onSuccess: () => navigateTo("/admin", {
        replace: true,
      }),
    }
  )
}
</script>

<template>
  <BaseHeader
    title="View Admin"
    :breadcrumbs="VIEW_ADMIN">
    <template
      #right
      v-if="adminData">
      <div class="flex items-center gap-x-3">
        <BaseTooltip tooltip="Edit">
          <NuxtLink
            :to="`/admin/${adminData.id}/edit`"
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

  <BaseLinearProgress v-if="adminLoading" />

  <AdminDetails
    v-else
    v-bind="adminData"
    class="mt-4" />

  <AdminDeleteConfirmation
    :open="showConfirmation"
    @confirm="confirmDelete"
    @cancel="cancelDelete" />
</template>
