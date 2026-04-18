<script setup lang="ts">
import type {
  AttributeObjectWithoutVariant,
} from "@/types/catalogueAttribute";

interface Props {
  fieldName: string
  attribute: AttributeObjectWithoutVariant
}
const props = defineProps<Props>()

interface Emits {
  labelChange: [string]
}
const emit = defineEmits<Emits>()

function updateDerivedLabel() {
  emit("labelChange", "Derived Label")
}
</script>

<template>
  <FormFieldInput
    :name="`${fieldName}.value`"
    class="gap-y-1.25 [&_input]:text-xs">
    <template #label>
      <FormLabel class="text-xs font-medium text-muted-foreground">
        Attribute Value
      </FormLabel>
    </template>
  </FormFieldInput>

  <FormFieldInput
    :name="`${fieldName}.meta.format`"
    class="gap-y-1.25 [&_input]:text-xs">
    <template #label>
      <FormLabel class="text-xs font-medium text-muted-foreground">
        Format
      </FormLabel>
    </template>
  </FormFieldInput>
</template>
