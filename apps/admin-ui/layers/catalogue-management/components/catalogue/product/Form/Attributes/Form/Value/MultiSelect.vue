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
    .map(({ label, id }) => ({
      textValue: label,
      value: id,
    }))
))
</script>

<template>
  <FormFieldCombobox
    :name="`${fieldName}.value`"
    :options
    multiple
    class="gap-y-1.25">
    <template #label>
      <FormLabel class="text-xs font-medium text-muted-foreground capitalize">
        {{ attributeType }} Value
      </FormLabel>
    </template>
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
    <template #placeholder>
      <span class="text-xs text-muted-foreground">
        Select the value for this {{ attributeType }}
      </span>
    </template>
  </FormFieldCombobox>
</template>
