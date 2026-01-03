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
  <section class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-2">
    <span class="text-foreground/75">
      Slug:
    </span>
    <strong>
      {{ slug }}
    </strong>
    <span class="text-foreground/75">
      Created At:
    </span>
    <strong>
      {{ formatDate(createdAt) }}
    </strong>
    <span class="text-foreground/75">
      Last Updated:
    </span>
    <strong>
      {{ formatDate(updatedAt) }}
    </strong>
  </section>
</template>
