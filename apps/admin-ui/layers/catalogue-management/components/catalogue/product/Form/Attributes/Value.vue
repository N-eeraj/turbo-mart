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
  <!-- type based value fields -->

  <!-- type based meta fields -->
  <template v-if="attribute.type === AttributeType.NUMBER">
    <!-- meta.unit select field -->
  </template>

  <template v-if="attribute.type === AttributeType.DATE">
    <!-- meta.format select field -->
  </template>

  <FormFieldInput
    v-if="showLabelField"
    :name="`${fieldBase}.label`"
    placeholder="Enter the label for this attribute"
    class="gap-y-1.25 [&_input]:text-xs">
    <template #label>
      <FormLabel class="text-xs font-medium text-muted-foreground">
        Label
      </FormLabel>
    </template>
  </FormFieldInput>
</template>
