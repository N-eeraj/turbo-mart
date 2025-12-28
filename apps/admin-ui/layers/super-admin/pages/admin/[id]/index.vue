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
</script>

<template>
  <BaseHeader
    title="View Admin"
    :breadcrumbs="VIEW_ADMIN">
    <template
      #right
      v-if="adminData">
      <div class="flex items-center gap-x-3">
        <NuxtLink
          :to="`/admin/${adminData.id}/edit`"
          :class="{
            'pointer-events-none': isDeleting,
          }">
          <BaseButton
            variant="outline"
            size="icon"
            :disabled="isDeleting">
            <Icon name="lucide:pencil" />
          </BaseButton>
        </NuxtLink>
        <BaseButton
          variant="ghost"
          size="icon"
          :loading="isDeleting"
          class="hover:bg-destructive/20 text-destructive hover:text-destructive duration-300"
          @click="onDelete">
          <Icon name="lucide:trash-2" />
        </BaseButton>
      </div>
    </template>
  </BaseHeader>

  <BaseLinearProgress v-if="adminLoading" />

  <section
    v-else
    class="mt-4">
    {{ adminData }}
  </section>

  <AdminDeleteConfirmation
    :open="showConfirmation"
    @confirm="confirmDelete"
    @cancel="cancelDelete" />
</template>
