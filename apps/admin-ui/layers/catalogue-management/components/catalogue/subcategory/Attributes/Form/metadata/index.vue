<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/models/Catalogue/Attributes"
import {
  CatalogueSubcategoryAttributesFormMetadataText as TextMetadata,
  CatalogueSubcategoryAttributesFormMetadataNumber as NumberMetadata,
  CatalogueSubcategoryAttributesFormMetadataBoolean as BooleanMetadata,
  CatalogueSubcategoryAttributesFormMetadataSelect as SelectMetadata,
  CatalogueSubcategoryAttributesFormMetadataDate as DateMetadata,
} from "#components"

interface Props {
  field: "create" | "update"
  index: number
  type?: AttributeType
}
const props = defineProps<Props>()

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
  <div
    v-if="MetadataComponent"
    class="order-2 md:order-3 md:col-span-3 pt-2 border-t border-t-foreground/10">
    <span class="text-xs text-foreground/75">
      Metadata
    </span>
    <MetadataComponent
      :field
      :index
      :type
      class="my-2 md:mb-0" />
  </div>
</template>
