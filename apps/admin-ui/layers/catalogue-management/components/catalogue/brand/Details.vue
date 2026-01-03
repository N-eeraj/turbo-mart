<script setup lang="ts">
import {
  type BrandCreationData,
} from "@app/schemas/catalogue/brand"

interface Props {
  slug: BrandCreationData["slug"]
  createdAt: BrandCreationData["createdAt"]
  updatedAt: BrandCreationData["updatedAt"]
}
const props = defineProps<Props>()
const formatDate = (date: Date) => useDateFormat(date, "DD/MM/YYYY")
</script>

<template>
  <ul class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-2 gap-y-2 p-3 md:px-4 rounded-lg border">
    <li class="flex flex-col">
      <span class="text-foreground/75">
        Slug:
      </span>
      <strong>
        {{ slug }}
      </strong>
    </li>
    <li class="flex flex-col">
      <span class="text-foreground/75">
        Created At:
      </span>
      <strong>
        {{ formatDate(createdAt) }}
      </strong>
    </li>
    <li class="flex flex-col">
      <span class="text-foreground/75">
        Last Updated:
      </span>
      <strong>
        {{ formatDate(updatedAt) }}
      </strong>
    </li>
  </ul>
</template>
