<script setup lang="ts">
interface Props {
  field: "create" | "update"
  index: number
}
defineProps<Props>()
</script>

<template>
  <FormFieldInput
    :name="`${field}[${index}].metadata.maxLength`"
    type="number"
    placeholder="Maximum length of the attribute value" />
</template>
