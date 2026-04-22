<script setup lang="ts">
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import {
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"
import {
  DATE_FORMATS,
  type DateFormatMap,
  type DateFormats,
} from "@app/definitions/date"
import {
  FormLabel,
} from "@/components/ui/form"

interface Props {
  fieldName: string
  attribute: AttributeObject<AttributeType.DATE>
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

const formatOptions = computed(() => {
  return Object.entries(DATE_FORMATS)
    .map(([value, format]) => ({
      value,
      textValue: format,
    }))
})

const {
  value,
} = useField<string>(`${props.fieldName}.value`)
const {
  value: metaFormat,
} = useField(`${props.fieldName}.meta.format`)

function getFormattedDate(
  format: DateFormatMap[DateFormats],
  date = new Date(),
): string {
  return useDateFormat(date, format).value
}

const formattedDate = computed(() => {
  if (
    (value.value === '' || value.value == null)
    ||
    (metaFormat.value === '' || metaFormat.value == null)
  ) return

  const format = DATE_FORMATS[metaFormat.value as DateFormats]
  const formattedDate = getFormattedDate(format, new Date(value.value))
  return formattedDate
})

watch(() => formattedDate.value, (formattedDate) => {
  if (formattedDate) {
    emit("labelChange", formattedDate)
  }
}, {
  immediate: true,
})
</script>

<template>
  <FormFieldDatePicker :name="`${fieldName}.value`">
    <template #label>
      <FormLabel class="text-xs font-medium text-muted-foreground capitalize">
        {{ attributeType }} Value
      </FormLabel>
    </template>
    <template #placeholder>
      <span class="text-xs font-medium text-muted-foreground">
        Enter the value for this {{ attributeType }}
      </span>
    </template>
  </FormFieldDatePicker>

  <FormFieldSelect
    :key="value"
    :name="`${fieldName}.meta.format`"
    :placeholder="`Select format for this ${attributeType}`"
    :options="formatOptions"
    class="gap-y-1.25 [&_button]:text-xs">
    <template #label>
      <FormLabel class="text-xs font-medium text-muted-foreground capitalize">
        {{ attributeType }} Date format
      </FormLabel>
    </template>

    <template #option="{ value: optionValue }">
      <span class="text-xs font-medium">
        {{ DATE_FORMATS[optionValue as DateFormats] }}
      </span>
      <small
        v-if="value"
        class="text-muted-foreground">
        ({{ getFormattedDate(DATE_FORMATS[optionValue as DateFormats], value) }})
      </small>
      <small
        v-else
        class="text-muted-foreground/80">
        ({{ getFormattedDate(DATE_FORMATS[optionValue as DateFormats]) }})
      </small>
    </template>
  </FormFieldSelect>
</template>
