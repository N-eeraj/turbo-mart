<script setup lang="ts">
import {
  AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"
import type {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"

interface Props {
  slug: string
  attributes: Array<AttributeObject<AttributeType>>
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

    <ul
      v-if="attributes?.length"
      class="grid md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3 mt-1">
      <li
        v-for="attribute in attributes"
        :key="attribute.id.toString()">
        <CatalogueSubcategoryAttributesDetails v-bind="attribute" />
      </li>
    </ul>
    <p
      v-else
      class="md:mt-1 text-xs md:text-sm text-foreground/60">
      No Attributes
    </p>
  </section>
</template>
