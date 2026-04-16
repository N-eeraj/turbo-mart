<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface Props {
  fieldBase: string
  attribute: Omit<AttributeObject<AttributeType>, "variant">
}
const props = defineProps<Props>()

const ATTRIBUTES_WITH_LABEL_INPUT: Array<AttributeType> = [
  AttributeType.NUMBER,
  AttributeType.COLOR,
] as const
const showLabelField = computed(() => ATTRIBUTES_WITH_LABEL_INPUT.includes(props.attribute.type))
</script>

<template>
  <FormFieldInput
    v-if="showLabelField"
    :name="`${fieldBase}.label`"
    placeholder="Label" />

  <!-- type based value fields -->

  <!-- type based meta fields -->
  <template v-if="attribute.type === AttributeType.NUMBER">
    <!-- meta.unit select field -->
  </template>

  <template v-if="attribute.type === AttributeType.DATE">
    <!-- meta.format select field -->
  </template>
</template>
