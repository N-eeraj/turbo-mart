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

    <MasonryWall
      v-if="attributes?.length"
      :items="attributes"
      :column-width="280"
      :gap="12"
      class="mt-1">
      <template #default="{ item }">
        <CatalogueSubcategoryAttributesDetails v-bind="item" />
      </template>
    </MasonryWall>
    <p
      v-else
      class="md:mt-1 text-xs md:text-sm text-foreground/60">
      No Attributes
    </p>
  </section>
</template>
