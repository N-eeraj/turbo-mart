<script setup lang="ts">
interface Props {
  field: "create" | "update"
  index: number
}
defineProps<Props>()
</script>

<template>
  <div class="grid md:grid-cols-2 gap-3">
    <FormFieldInput
      :name="`${field}[${index}].metadata.trueValue`"
      label="True Text"
      description="Text displayed for true value"
      clearable />
    <FormFieldInput
      :name="`${field}[${index}].metadata.falseValue`"
      label="False Text"
      description="Text displayed for false value"
      clearable />
  </div>
</template>
