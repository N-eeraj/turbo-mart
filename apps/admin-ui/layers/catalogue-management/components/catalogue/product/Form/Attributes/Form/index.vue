<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute";
import type {
  AttributeObjectWithoutVariant,
} from "@/types/catalogueAttribute";
import {
  CatalogueProductFormAttributesFormValueText,
  CatalogueProductFormAttributesFormValueNumber,
  CatalogueProductFormAttributesFormValueBoolean,
  CatalogueProductFormAttributesFormValueSelect,
  CatalogueProductFormAttributesFormValueMultiSelect,
  CatalogueProductFormAttributesFormValueColor,
  CatalogueProductFormAttributesFormValueDate,
  CatalogueProductFormAttributesFormValueJson,
} from "#components"

interface Props {
  fieldName: string
  attribute: AttributeObjectWithoutVariant
  isVariant?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isVariant: false,
})

const VALUE_META_COMPONENT_MAP = {
  [AttributeType.TEXT]: CatalogueProductFormAttributesFormValueText,
  [AttributeType.NUMBER]: CatalogueProductFormAttributesFormValueNumber,
  [AttributeType.BOOLEAN]: CatalogueProductFormAttributesFormValueBoolean,
  [AttributeType.SELECT]: CatalogueProductFormAttributesFormValueSelect,
  [AttributeType.MULTI_SELECT]: CatalogueProductFormAttributesFormValueMultiSelect,
  [AttributeType.COLOR]: CatalogueProductFormAttributesFormValueColor,
  [AttributeType.DATE]: CatalogueProductFormAttributesFormValueDate,
  [AttributeType.JSON]: CatalogueProductFormAttributesFormValueJson,
} as const
const ValueMetaComponent = computed(() => VALUE_META_COMPONENT_MAP[props.attribute.type])

const {
  setFieldValue,
} = inject("product-form-attributes")
function handleDerivedLabelUpdate(value: string) {
  setFieldValue(`${props.fieldName}.label`, value)
}
</script>

<template>
  <component
    :is="ValueMetaComponent"
    :field-name
    :attribute
    :is-variant
    @label-change="handleDerivedLabelUpdate" />

  <CatalogueProductFormAttributesFormLabel
    :field-name
    :attribute
    :is-variant />
</template>
