<script setup lang="ts">
import {
  FormLabel,
} from "@/components/ui/form"

interface Props {
  field: "create" | "update"
  index: number
}
defineProps<Props>()
</script>

<template>
  <div class="grid md:grid-cols-2 gap-3">
    <FormFieldInput
      :name="`${field}[${index}].metadata.min`"
      type="number"
      label="Minimum Value"
      placeholder="Minimum value of the attribute" />
    <FormFieldInput
      :name="`${field}[${index}].metadata.max`"
      type="number"
      label="Maximum Value"
      placeholder="Maximum value of the attribute" />
    <FormFieldInput
      :name="`${field}[${index}].metadata.unit`"
      label="Base Unit"
      placeholder="Base unit the attribute is measured in" />
    <FormFieldInput
      :name="`${field}[${index}].metadata.base`"
      type="number"
      placeholder="Base relative value of the unit">
      <template #label>
        <div class="flex items-center gap-x-2">
          <FormLabel>
            Base Value
          </FormLabel>
          <BaseTooltip>
            <Icon
              name="lucide:info"
              :size="12" />
            <template #tooltip>
              <div class="max-w-3xs">
                The actual value of the attribute will be the product of attribute value and the base value
              </div>
            </template>
          </BaseTooltip>
        </div>
      </template>
    </FormFieldInput>
    <FormFieldInput
      :name="`${field}[${index}].metadata.template`"
      label="Display Template"
      placeholder="eg: {{value}} {{unit}}"
      class="md:col-span-2" />
  </div>
</template>
