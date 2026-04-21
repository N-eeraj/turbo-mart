<script setup lang="ts">
import {
  AttributeType,
  MeasurementType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"
import {
  MEASUREMENT_UNITS,
} from "@app/definitions/measurement/index";
import type {
  UnitsMap,
} from "@app/definitions/measurement/types";

interface Props {
  fieldName: string
  attribute: AttributeObject<AttributeType.NUMBER>
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
const unitOptions = computed(() => {
  if (!props.attribute.metadata) return null
  const unitMeasurementType: MeasurementType = props.attribute.metadata.measurementType
  if (unitMeasurementType === MeasurementType.NUMBER) return null
  const unitsMap = MEASUREMENT_UNITS[unitMeasurementType as keyof UnitsMap]

  return Object.entries(unitsMap)
    .map(([value, { name, symbol }]) => ({
      value,
      textValue: `${name} (${symbol})`,
    }))
})

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

  <FormFieldSelect
    v-if="unitOptions?.length"
    :name="`${fieldName}.meta.unit`"
    :placeholder="`Select unit for this ${attributeType}`"
    :options="unitOptions"
    class="gap-y-1.25 [&_input]:text-xs">
    <template #label>
      <FormLabel class="text-xs font-medium text-muted-foreground capitalize">
        {{ attributeType }} Unit
      </FormLabel>
    </template>
  </FormFieldSelect>
</template>
