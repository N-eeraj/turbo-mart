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
    <template v-if="attributes?.length">
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
        :items="attributes"
        :column-width="280"
        :gap="12"
        class="mt-1">
        <template #default="{ item }">
          <CatalogueSubcategoryAttributesDetails v-bind="item" />
        </template>
      </MasonryWall>
    </template>

    <BaseEmpty
      v-else
      title="No Attributes"
      description="There are no attributes defined for this subcategory.">
      <template #media>
        <Icon
          name="lucide:sparkle" />
      </template>
      <NuxtLink :to="`/catalogue/subcategories/${slug}/attributes`">
        <BaseButton
          variant="outline"
          class="hover:bg-primary/10 order-primary/50">
          <span>
            Create Attributes
          </span>
          <Icon
            name="lucide:plus"
            class="text-primary" />
        </BaseButton>
      </NuxtLink>
    </BaseEmpty>
  </section>
</template>
