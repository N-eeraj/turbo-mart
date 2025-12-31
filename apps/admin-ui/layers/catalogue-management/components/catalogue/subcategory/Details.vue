<script setup lang="ts">
import {
  type CategoryCreationData,
} from "@app/schemas/catalogue/category"
import {
  type SubcategoryCreationData,
} from "@app/schemas/catalogue/subcategory"

interface Category extends CategoryCreationData {
  id: SubcategoryCreationData["category"]
}

interface Props {
  name: SubcategoryCreationData["name"]
  slug: SubcategoryCreationData["slug"]
  category: Category
  createdAt: SubcategoryCreationData["createdAt"]
  updatedAt: SubcategoryCreationData["updatedAt"]
}
const props = defineProps<Props>()
const formatDate = (date: Date) => useDateFormat(date, "DD/MM/YYYY")
</script>

<template>
  <section class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-2">
    <span class="text-foreground/75">
      Name:
    </span>
    <strong>
      {{ name }}
    </strong>
    <span class="text-foreground/75">
      Slug:
    </span>
    <strong>
      {{ slug }}
    </strong>
    <span class="text-foreground/75">
      Category:
    </span>
    <NuxtLink
      :to="`/catalogue/categories/${category.slug}`"
      class="w-fit hover:underline">
      <strong>
        {{ category.name }}
      </strong>
    </NuxtLink>
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
