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

const measurementTypeDescription = computed(() => (
  measurementTypes.value
    ?.find(({ value }) => value === measurementTypeField.value)?.description
))

const {
  value: step,
  errorMessage: stepErrorMessage,
} = useField<AcceptableValue>(`${props.field}[${props.index}].metadata.step`)
</script>

<template>
  <div class="grid @sm/attribute-card:grid-cols-2 @md/attribute-card:grid-cols-6 @3xl/attribute-card:grid-cols-12 gap-3 @3xl/attribute-card:gap-y-4">
    <div class="flex flex-col @sm/attribute-card:col-span-2 @md/attribute-card:col-span-6 gap-y-2">
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
      <div class="flex flex-col max-w-118">
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
      class="py-2 @md/attribute-card:col-span-3 @3xl/attribute-card:self-center" />
    <FormFieldCheckbox
      :name="`${field}[${index}].metadata.allowNegative`"
      label="Allow negative values"
      class="py-2 @md/attribute-card:col-span-3 @3xl/attribute-card:self-center" />

    <FormFieldInput
      :name="`${field}[${index}].metadata.step`"
      v-model="step"
      type="number"
      placeholder="Value steps"
      :step="0.001"
      :min="0.001"
      :max="10000"
      description="Defines valid interval for the value."
      class="@md/attribute-card:col-span-2 @3xl/attribute-card:col-span-3 @md/attribute-card:col-start-1">
      <template #label>
        <FormLabel class="flex items-center gap-x-2">
          <span>
            Step Value
          </span>
          <BaseTooltip>
            <Icon
              name="lucide:info"
              :size="12" />
            <template #tooltip>
              <div class="max-w-3xs">
                For example, with a step of 0.5, values like 1, 1.5, and 2 are allowed, but 1.3 is not.
              </div>
            </template>
          </BaseTooltip>
        </FormLabel>
      </template>
    </FormFieldInput>

    <FormFieldInput
      :name="`${field}[${index}].metadata.min`"
      type="number"
      label="Minimum Value"
      placeholder="Minimum value of the attribute"
      :step
      class="@sm/attribute-card:col-start-1 @md/attribute-card:col-span-2 @3xl/attribute-card:col-span-3 @md/attribute-card:col-start-3" />
    <FormFieldInput
      :name="`${field}[${index}].metadata.max`"
      type="number"
      label="Maximum Value"
      placeholder="Maximum value of the attribute"
      :step
      class="@md/attribute-card:col-span-2 @3xl/attribute-card:col-span-3" />
  </div>
</template>
