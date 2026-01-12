<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  RadioGroupItem,
} from "@/components/ui/radio-group"
import {
  Label,
} from "@/components/ui/label"

interface Props {
  field: "create" | "update"
  index: number
}
defineProps<Props>()

const OPTIONS = [
  {
    label: "Text",
    value: AttributeType.TEXT,
  },
  {
    label: "Number",
    value: AttributeType.NUMBER,
  },
] as const
</script>

<template>
  <div class="grid md:grid-cols-2 gap-3">
    <FormFieldRadio
      :name="`${field}[${index}].metadata.type`"
      :options="OPTIONS"
      label="Option Type"
      radio-group-class="flex gap-x-0">
      <template #item="{ value, label }">
        <Label class="p-3 has-aria-checked:bg-primary/10 border has-aria-checked:border-primary/75 cursor-pointer">
          <RadioGroupItem :value />
          <span>
            {{ label }}
          </span>
        </Label>
      </template>
    </FormFieldRadio>
  </div>
</template>
