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
} from "@app/definitions/measurement/index"
import type {
  MeasurementUnitEnumMap,
  UnitsEnumMapValue,
  UnitsMap,
} from "@app/definitions/measurement/types"
import {
  FormLabel,
} from "@/components/ui/form"

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

type MeasurementUnitEnum = MeasurementUnitEnumMap[keyof MeasurementUnitEnumMap]

const attributeType = computed(() => props.isVariant ? "variant" : "property")

const unitsMap = computed(() => {
  if (!props.attribute.metadata) return null
  const unitMeasurementType: MeasurementType = props.attribute.metadata.measurementType
  if (unitMeasurementType === MeasurementType.NUMBER) return null
  const unitsMap = MEASUREMENT_UNITS[unitMeasurementType as keyof UnitsMap]
  return unitsMap
})
const unitOptions = computed(() => {
  if (!unitsMap.value) return null
  return Object.entries(unitsMap.value)
    .map(([value, { name, symbol }]) => ({
      value,
      textValue: `${name} (${symbol})`,
    }))
})

const {
  value,
} = useField(`${props.fieldName}.value`)
const {
  value: metaUnit,
} = useField(`${props.fieldName}.meta.unit`)

watch(() => [
  value.value,
  metaUnit.value,
], ([
  value,
  metaUnit,
]) => {
  // guard falsy value and metaUnit
  if (
    !unitsMap.value
    ||
    (value === "" || value == null)
    ||
    (metaUnit === "" || metaUnit == null)
  ) return

  const unitTypeValue = metaUnit as MeasurementUnitEnum
  const unitMapValue = unitsMap.value as UnitsEnumMapValue<MeasurementUnitEnum>

  const {
    symbol,
  } = unitMapValue[unitTypeValue]
  emit("labelChange", `${value} ${symbol}`)
}, {
  deep: true,
  immediate: true,
})
</script>

<template>
  <FormFieldInput
    :name="`${fieldName}.value`"
    type="number"
    inputmode="decimal"
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
    class="gap-y-1.25 [&_button]:text-xs">
    <template #label>
      <FormLabel class="text-xs font-medium text-muted-foreground capitalize">
        {{ attributeType }} Unit
      </FormLabel>
    </template>
  </FormFieldSelect>
</template>
