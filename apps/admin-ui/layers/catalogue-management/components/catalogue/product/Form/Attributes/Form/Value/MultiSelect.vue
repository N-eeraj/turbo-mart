<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface Props {
  fieldName: string
  attribute: AttributeObject<AttributeType.MULTI_SELECT>
  isVariant?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isVariant: false,
})
</script>

<template>
  <CatalogueProductFormAttributesFormValueSelectBase
    v-bind="props"
    multiple>
    <template #trigger-value="{ selectedOptions, modelValue }">
      <span class="text-xs">
        <template v-if="(modelValue as Array<string>)?.length > 2">
          {{ (modelValue as Array<string>).length }} Selected
        </template>
        <template v-else-if="(modelValue as Array<string>)?.length">
          {{ selectedOptions }}
        </template>
      </span>
    </template>
  </CatalogueProductFormAttributesFormValueSelectBase>
</template>
