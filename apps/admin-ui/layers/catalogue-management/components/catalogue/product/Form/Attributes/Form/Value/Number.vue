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
    :name="`${fieldName}.meta.unit`"
    :placeholder="`Select unit for this ${attributeType}`"
    class="gap-y-1.25 [&_input]:text-xs">
    <template #label>
      <FormLabel class="text-xs font-medium text-muted-foreground capitalize">
        {{ attributeType }} Unit
      </FormLabel>
    </template>
  </FormFieldInput>
</template>
