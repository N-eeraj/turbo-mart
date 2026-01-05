<script setup lang="ts">
import {
  type SubcategoryAttributeUpdateData,
} from "@app/schemas/admin/catalogue/subcategory"

interface Props {
  slug: string
  attributes: SubcategoryAttributeUpdateData["update"]
}
const props = defineProps<Props>()
</script>

<template>
  <section>
    <div class="flex items-baseline gap-x-1">
      <h2 class="text-lg md:text-xl">
        Attributes
      </h2>
      <NuxtLink :to="`/catalogue/subcategories/${slug}/attributes`">
        <BaseButton
          variant="ghost"
          size="icon-sm">
          <Icon name="lucide-edit" />
        </BaseButton>
      </NuxtLink>
    </div>

    <ul v-if="attributes?.length">
      <li
        v-for="({ id, name, type, required, variant, metadata }) in attributes"
        :key="id">
        {{ name }}
        {{ type }}
        {{ required }}
        {{ variant }}
      </li>
    </ul>
    <p
      v-else
      class="md:mt-1 text-xs md:text-sm text-foreground/60">
      No Attributes
    </p>
  </section>
</template>
