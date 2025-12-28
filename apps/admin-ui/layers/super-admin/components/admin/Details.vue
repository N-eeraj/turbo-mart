<script setup lang="ts">
import type {
  Permissions,
} from "@app/database/mongoose/enums/admin/user"

interface Props {
  id: string
  email: string
  name: string
  profilePicture: string
  permissions: Array<{
    name: string
    value: Permissions
  }>
  createdAt: Date
}
defineProps<Props>()
</script>

<template>
  <section class="space-y-4 md:space-y-5">
    <!-- Profile Details -->
    <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 items-center w-full">
      <img
        v-if="profilePicture"
        :src="profilePicture"
        :alt="name"
        class="row-span-2 size-24 rounded-full mx-auto md:mx-0" />

      <h3 class="self-end text-3xl">
        {{ name }}
      </h3>

      <span class="self-start text-foreground/75 text-sm">
        {{ email }}
      </span>
    </div>

    <!-- Permissions -->
    <div class="space-y-1">
      <strong class="inline-block text-lg md:text-xl font-medium">
        Permissions
      </strong>
      <ul class="flex flex-wrap gap-2">
        <li
          v-for="({ name, value }) in permissions"
          :key="value"
          class="bg-secondary px-2 py-1">
          {{ name }}
        </li>
      </ul>
    </div>
  </section>
</template>
