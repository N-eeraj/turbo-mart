<script setup lang="ts">
import type {
  AttributeObjectWithoutVariant,
} from "@/types/catalogueAttribute";

interface Props {
  name: string
  attribute: AttributeObjectWithoutVariant
}
const props = defineProps<Props>()

interface Emits {
  labelChange: [string]
}
const emit = defineEmits<Emits>()
</script>

<template>
  <FormFieldInput
    :name
    class="gap-y-1.25 [&_input]:text-xs">
    <template #label>
      <FormLabel class="text-xs font-medium text-muted-foreground">
        Attribute Value
      </FormLabel>
    </template>
  </FormFieldInput>

  <!-- meta.unit select field -->
</template>
