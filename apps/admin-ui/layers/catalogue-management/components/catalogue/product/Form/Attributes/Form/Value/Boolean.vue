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

const options = [
  {
    label: "True",
    value: "true",
  },
  {
    label: "False",
    value: "false",
  },
]
</script>

<template>
  <FormFieldRadio
    :name="`${fieldName}.value`"
    :options
    radio-group-class="flex">
    <template #label>
      <FormLabel class="text-xs font-medium text-muted-foreground capitalize">
        {{ attributeType }} Value
      </FormLabel>
    </template>
  </FormFieldRadio>
</template>
