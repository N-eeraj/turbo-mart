<script setup lang="ts">
import {
  ALL_ADMINS,
} from "~/constants/breadcrumbs"

const {
  data,
  isLoading,
  page,
  search,
  order,
  columns,
  handleDelete,
  showDeleteConfirmation,
  deletingIds,
  confirmDelete,
  cancelDelete,
} = useAdminListData()

const formatDate = (createdAt) => useDateFormat(createdAt, "DD/MM/YYYY")
</script>

<template>
  <BaseHeader
    title="All Admins"
    :breadcrumbs="ALL_ADMINS" />

  <DataTable
    v-model:search="search"
    v-model:order="order"
    :data
    :columns
    :loading="isLoading"
    class="mt-4">
    <template #table-cell-createdAt="{ row }">
      {{ formatDate(row.original.createdAt) }}
    </template>
    <template #table-cell-id="{ row }">
      <div class="flex items-center gap-x-2">
        <BaseTooltip tooltip="View">
          <NuxtLink
            :to="`/admin/${row.original.id}`"
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
            :to="`/admin/${row.original.id}/edit`"
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
            :loading="deletingIds.includes(row.original.id)"
            class="hover:bg-destructive/20 text-destructive hover:text-destructive duration-300"
            @click="handleDelete(row.original.id)">
            <Icon name="lucide:trash-2" />
          </BaseButton>
        </BaseTooltip>
      </div>
    </template>
  </DataTable>

  <AdminDeleteConfirmation
    :open="showDeleteConfirmation"
    @confirm="confirmDelete"
    @cancel="cancelDelete" />
</template>
