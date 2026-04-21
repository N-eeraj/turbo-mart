<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface Props {
  fieldName: string
  attribute: AttributeObject<AttributeType.COLOR>
  isVariant?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isVariant: false,
})

const attributeType = computed(() => props.isVariant ? "variant" : "property")
</script>

<template>
  <FormFieldInput
    :name="`${fieldName}.value`"
    :placeholder="`Enter the value for this ${attributeType}`"
    class="gap-y-1.25 [&_input]:text-xs">
    <template #label>
      <FormLabel class="text-xs font-medium text-muted-foreground capitalize">
        {{ attributeType }} Value
      </FormLabel>
    </template>
  </FormFieldInput>
</template>
