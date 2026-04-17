<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute";
import type {
  AttributeObjectWithoutVariant,
} from "@/types/catalogueAttribute";
import {
  CatalogueProductFormAttributesValueText,
  CatalogueProductFormAttributesValueNumber,
  CatalogueProductFormAttributesValueBoolean,
  CatalogueProductFormAttributesValueSelect,
  CatalogueProductFormAttributesValueMultiSelect,
  CatalogueProductFormAttributesValueColor,
  CatalogueProductFormAttributesValueDate,
  CatalogueProductFormAttributesValueJson,
} from "#components"

interface Props {
  fieldName: string
  attribute: AttributeObjectWithoutVariant
}
const props = defineProps<Props>()

const VALUE_META_COMPONENT_MAP = {
  [AttributeType.TEXT]: CatalogueProductFormAttributesValueText,
  [AttributeType.NUMBER]: CatalogueProductFormAttributesValueNumber,
  [AttributeType.BOOLEAN]: CatalogueProductFormAttributesValueBoolean,
  [AttributeType.SELECT]: CatalogueProductFormAttributesValueSelect,
  [AttributeType.MULTI_SELECT]: CatalogueProductFormAttributesValueMultiSelect,
  [AttributeType.COLOR]: CatalogueProductFormAttributesValueColor,
  [AttributeType.DATE]: CatalogueProductFormAttributesValueDate,
  [AttributeType.JSON]: CatalogueProductFormAttributesValueJson,
} as const
const ValueMetaComponent = computed(() => VALUE_META_COMPONENT_MAP[props.attribute.type])
</script>

<template>
  <component
    :is="ValueMetaComponent"
    :field-name
    :attribute />
</template>
