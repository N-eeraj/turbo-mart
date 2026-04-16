<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface Props {
  index: number
  attribute: Omit<AttributeObject<AttributeType>, "variant">
}
const props = defineProps<Props>()

const {
  fields: variantFields,
  push: variantPush,
  remove: variantRemove,
} = useFieldArray(`variants[${props.index}].values`)

function addVariant() {
  variantPush({})
}
</script>

<template>
  <CatalogueProductFormAttributesValue
    v-for="(variant, variantIndex) in variantFields"
    :key="variant.key"
    :field-base="`variants[${props.index}].values[${variantIndex}]`"
    :attribute />
    <BaseButton
      variant="outline"
      type="button"
      size="icon-sm"
      class="size-8 border-primary/50"
      @click="addVariant">
      <Icon
        name="lucide:plus"
        :size="12"
        class="text-primary" />
    </BaseButton>
</template>
