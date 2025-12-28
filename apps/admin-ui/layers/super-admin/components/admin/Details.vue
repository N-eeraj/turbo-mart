<script setup lang="ts">
import type {
  Permissions,
} from "@app/database/mongoose/enums/admin/user"

interface Props {
  id: string
  email: string
  name: string
  profilePicture: string
  permissions: Array<Permissions>
  createdAt: Date
}
defineProps<Props>()
</script>

<template>
  <section class="flex flex-col items-start gap-y-1">
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
  </section>
</template>
