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
  toggleOrder,
} = useAdminListData()
</script>

<template>
  <BaseHeader
    title="All Admins"
    :breadcrumbs="ALL_ADMINS" />

  <section class="mt-4">
    <div class="flex justify-end items-center gap-x-3">
      <FormFieldInput
        name="search"
        v-model="search"
        placeholder="Search"
        clearable />

      <BaseButton
        variant="outline"
        size="icon"
        @click="toggleOrder">
        <Icon :name="order === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down'" />
      </BaseButton>
    </div>


    <BaseLinearProgress v-if="isLoading" />
    <template v-else>
      {{ data }}
    </template>
  </section>
</template>
