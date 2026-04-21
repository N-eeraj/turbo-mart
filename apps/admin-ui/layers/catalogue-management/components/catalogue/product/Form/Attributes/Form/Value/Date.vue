<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

interface Props {
  fieldName: string
  attribute: AttributeObject<AttributeType.DATE>
  isVariant?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isVariant: false,
})

interface Emits {
  labelChange: [string]
}
const emit = defineEmits<Emits>()

const attributeType = computed(() => props.isVariant ? "variant" : "property")

function updateDerivedLabel() {
  emit("labelChange", "Derived Label")
}
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

  <FormFieldInput
    :name="`${fieldName}.meta.format`"
    :placeholder="`Select format for this ${attributeType}`"
    class="gap-y-1.25 [&_input]:text-xs">
    <template #label>
      <FormLabel class="text-xs font-medium text-muted-foreground">
        Format
      </FormLabel>
    </template>
  </FormFieldInput>
</template>
