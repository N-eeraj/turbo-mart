<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface Props {
  fieldName: string
  attribute: AttributeObject<AttributeType.SELECT>
  isVariant?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isVariant: false,
})
</script>

<template>
  <CatalogueProductFormAttributesFormValueSelectBase v-bind="props">
    <template #trigger-value="{ selectedOptions }">
      <span class="text-xs">
        {{ selectedOptions }}
      </span>
    </template>
  </CatalogueProductFormAttributesFormValueSelectBase>
</template>
