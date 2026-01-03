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
  slug: SubcategoryCreationData["slug"]
  category: Category
  createdAt: SubcategoryCreationData["createdAt"]
  updatedAt: SubcategoryCreationData["updatedAt"]
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
        Category:
      </span>
      <NuxtLink
        :to="`/catalogue/categories/${category.slug}`"
        class="w-fit hover:underline">
        <strong>
          {{ category.name }}
        </strong>
      </NuxtLink>
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
