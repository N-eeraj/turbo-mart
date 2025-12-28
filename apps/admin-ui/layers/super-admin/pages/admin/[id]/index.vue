<script setup lang="ts">
import {
  VIEW_ADMIN,
} from "~/constants/breadcrumbs"

const {
  data: adminData,
  isLoading: adminLoading,
} = useAdminData()
</script>

<template>
  <BaseHeader
    title="View Admin"
    :breadcrumbs="VIEW_ADMIN">
    <template
      #right
      v-if="adminData">
      <div class="flex items-center gap-x-3">
        <NuxtLink :to="`/admin/${adminData.id}/edit`">
          <BaseButton
            variant="outline"
            size="icon">
            <Icon name="lucide:pencil" />
          </BaseButton>
        </NuxtLink>
        <BaseButton
          variant="ghost"
          size="icon"
          class="hover:bg-destructive/20 text-destructive hover:text-destructive duration-300">
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
</template>
