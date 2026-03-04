<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"
import {
  CatalogueSubcategoryAttributesDetailsMetadataText as TextMetadata,
  CatalogueSubcategoryAttributesDetailsMetadataNumber as NumberMetadata,
  CatalogueSubcategoryAttributesDetailsMetadataBoolean as BooleanMetadata,
  CatalogueSubcategoryAttributesDetailsMetadataSelect as SelectMetadata,
  CatalogueSubcategoryAttributesDetailsMetadataDate as DateMetadata,
} from "#components"

interface Props<T extends AttributeType> {
  name: AttributeObject<T>["name"]
  type: T
  required?: AttributeObject<T>["required"]
  variant?: AttributeObject<T>["variant"]
  metadata?: AttributeObject<T>["metadata"]
}
const props = defineProps<Props<AttributeType>>()

const MetadataComponentMap: Partial<Record<AttributeType, DefineComponent>> = {
  [AttributeType.TEXT]: TextMetadata,
  [AttributeType.NUMBER]: NumberMetadata,
  [AttributeType.BOOLEAN]: BooleanMetadata,
  [AttributeType.SELECT]: SelectMetadata,
  [AttributeType.MULTI_SELECT]: SelectMetadata,
  [AttributeType.DATE]: DateMetadata,
}
const MetadataComponent = computed<DefineComponent | undefined>(() => MetadataComponentMap[props.type])
</script>

<template>
  <div class="flex flex-col gap-y-1 h-full p-3 bg-secondary border rounded">
    <strong>
      {{ name }}
    </strong>

    <div class="flex items-center text-sm">
      <div class="flex-1 flex items-center gap-x-1">
        <span class="text-foreground/75">
          Required:
        </span>
        <Icon
          :name="required ? 'lucide:check' : 'lucide:x'"
          :class="required ? 'text-green-500' : 'text-red-500'" />
      </div>
      <div class="flex-1 flex items-center gap-x-1">
        <span class="text-foreground/75">
          Variant:
        </span>
        <Icon
          :name="variant ? 'lucide:check' : 'lucide:x'"
          :class="variant ? 'text-green-500' : 'text-red-500'" />
      </div>
    </div>

    <div
      v-if="MetadataComponent"
      class="flex flex-col gap-y-1 mt-2 pt-1.5 md:pt-2 border-t border-t-foreground/10">
      <span class="text-xs text-foreground/75 font-semibold">
        Metadata
      </span>
      <MetadataComponent
        :metadata
        class="shrink-0" />
    </div>
  </div>
</template>
