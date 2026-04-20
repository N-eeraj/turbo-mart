<script setup lang="ts">
import type {
  AttributeObjectWithoutVariant,
} from "@/types/catalogueAttribute";

interface Props {
  fieldName: string
  attribute: AttributeObjectWithoutVariant
  isVariant?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isVariant: false,
})

const attributeType = computed(() => props.isVariant ? "variant" : "property")

const options = computed(() => (
  props.attribute.metadata.options
    .map(({ value, id }) => ({
      textValue: value,
      value: id,
    }))
))
</script>

<template>
  <FormFieldCombobox
    :name="`${fieldName}.value`"
    :options
    class="gap-y-1.25">
    <template #trigger-value="{ selectedOptions, modelValue }">
      <span class="text-xs">
        {{ selectedOptions }}
      </span>
    </template>
    <template #placeholder>
      <span class="text-xs text-muted-foreground">
        Select the value for this {{ attributeType }}
      </span>
    </template>
  </FormFieldCombobox>
</template>
