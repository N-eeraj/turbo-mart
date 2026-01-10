<script setup lang="ts">
interface Props {
  field: "create" | "update"
  index: number
}
defineProps<Props>()
</script>

<template>
  <div class="grid md:grid-cols-2 gap-3">
    <FormFieldDatePicker
      :name="`${field}[${index}].metadata.min`"
      label="Minimum Date"/>
    <FormFieldDatePicker
      :name="`${field}[${index}].metadata.max`"
      label="Maximum Date"/>
  </div>
</template>
