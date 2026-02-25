<script setup lang="ts">
import {
  FormLabel,
} from "@/components/ui/form"
import type {
  AcceptableValue,
} from "reka-ui"

interface Props {
  field: "create" | "update"
  index: number
}
const props = defineProps<Props>()

const {
  data: measurementTypes,
  status: measurementTypesStatus,
} = useLazyAsyncData(
  "measurement-types",
  () => useApi("/admin/catalogue/subcategories/attribute/measurement/types"),
  {
    transform: ({ data }) => data
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(({ value, name, description }) => ({
        value,
        textValue: name,
        description,
      })),
    getCachedData: (key: string, nuxtApp: NuxtApp) => nuxtApp.payload.data[key]
  }
)
const isLoadingMeasurementTypes = computed(() => measurementTypesStatus.value === "pending")

const {
  value: measurementTypeField,
  errorMessage: measurementTypeErrorMessage,
} = useField<AcceptableValue>(`${props.field}[${props.index}].metadata.measurementType`)

const measurementTypeDescription = computed(() => measurementTypes.value?.find(({ value }) => value === measurementTypeField.value)?.description)
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

    <div class="flex flex-col col-span-2 gap-y-2">
      <FormLabel class="flex items-center gap-x-2">
        <span>
          Measurement Type
        </span>
        <BaseTooltip>
          <Icon
            name="lucide:info"
            :size="12" />
          <template #tooltip>
            <div class="max-w-3xs">
              Select the type of measurement this value represents
            </div>
          </template>
        </BaseTooltip>
      </FormLabel>
      <div class="flex flex-col">
        <BaseCombobox
          v-model="measurementTypeField"
          :options="measurementTypes"
          placeholder="Measurement Type"
          :loading="isLoadingMeasurementTypes"
          class="rounded-b-none" />
          <small
            v-if="measurementTypeDescription"
            class="px-1.5 py-1 bg-input text-muted-foreground text-xs rounded-b-md">
            {{ measurementTypeDescription }}
          </small>
      </div>
      <small
        v-if="measurementTypeErrorMessage"
        class="text-destructive">
        {{ measurementTypeErrorMessage }}
      </small>
    </div>

    <FormFieldCheckbox
      :name="`${field}[${index}].metadata.allowDecimal`"
      label="Allow decimal values"
      class="py-2 md:order-2" />
    <FormFieldCheckbox
      :name="`${field}[${index}].metadata.allowNegative`"
      label="Allow negative values"
      class="py-2 md:order-2" />
  </div>
</template>
